// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// // 🔹 REGISTER USER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, username, email, password, bio, location, profilePic } = req.body;

//     // Check if email or username already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser)
//       return res.status(400).json({ message: "Email or username already in use" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       username,
//       email,
//       password: hashedPassword,
//       bio,
//       location,
//       profilePic,
//     });

//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         _id: user._id,
//         name: user.name,
//         username: user.username,
//         email: user.email,
//         profilePic: user.profilePic,
//         bio: user.bio,
//         location: user.location,
//         token,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🔹 LOGIN USER
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     // Create token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       username: user.username,
//       email: user.email,
//       profilePic: user.profilePic,
//       bio: user.bio,
//       location: user.location,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🔹 GET USER PROFILE (Protected)
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //refresh token 
// // controllers/authController.js
// export const refreshAccessToken = async (req, res) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

//   try {
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
//     const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ accessToken });
//   } catch {
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// };



// server/controllers/authController.js

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js";
import User from "../models/userModel.js";
import { signAccessToken, signRefreshToken } from "../utils/generateToken.js";

/**
 * Exchange Firebase ID token for CarsX tokens (access + refresh) and user record.
 * Body: { idToken }
 */
export const firebaseAuth = async (req, res, next) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "Missing Firebase ID token" });

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    // decoded contains uid, email, name, picture, etc.
    const { uid, email, name, picture } = decoded;

    // Try find by firebaseUid or fallback to email
    let user = await User.findOne({ $or: [{ firebaseUid: uid }, { email }] });

    if (!user) {
      // Create username based on email (ensure uniqueness)
      const baseUsername = email ? email.split("@")[0] : `user_${uid.slice(0, 6)}`;
      let username = baseUsername;
      let suffix = 1;
      // ensure unique username
      while (await User.findOne({ username })) {
        username = `${baseUsername}${suffix++}`;
      }

      user = await User.create({
        firebaseUid: uid,
        name: name || baseUsername,
        email,
        username,
        profilePic: picture || "",
      });
    } else if (!user.firebaseUid) {
      // If user exists by email, link firebaseUid
      user.firebaseUid = uid;
      if (!user.profilePic && picture) user.profilePic = picture;
      await user.save();
    }

    // Issue tokens
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // Save refresh token (rotation-safe: keep last N)
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 10) user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    console.error("firebaseAuth error:", err);
    return res.status(401).json({ message: "Invalid Firebase token" });
  }
};

/**
 * Local registration (optional). If you rely fully on Firebase, you can omit this.
 * Body: { name, username, email, password, bio, location, profilePic }
 */
export const registerUser = async (req, res, next) => {
  try {
    const { name, username, email, password, bio, location, profilePic } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields required: name, username, email, password" });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ message: "Email or username already in use" });

    // Hash the password if you plan to support local auth
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio: bio || "",
      location: location || "",
      profilePic: profilePic || "",
    });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 10) user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        location: user.location,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Local login (optional). If using Firebase-only, clients will call /firebase instead.
 * Body: { email, password }
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 10) user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        bio: user.bio,
        location: user.location,
      },
      tokens: { accessToken, refreshToken },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Refresh access token using refresh token (rotation).
 * Body: { refreshToken }
 */
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure refresh token is one we issued and haven't revoked
    if (!user.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "Refresh token revoked" });
    }

    // Issue new tokens
    const newAccessToken = signAccessToken(user._id);
    const newRefreshToken = signRefreshToken(user._id);

    // Replace used refresh token with the new one (rotation)
    user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
    user.refreshTokens.push(newRefreshToken);
    if (user.refreshTokens.length > 10) user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    next(err);
  }
};

/**
 * Logout - revoke provided refresh token.
 * Body: { refreshToken }
 */
export const logoutUser = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t !== refreshToken);
        await user.save();
      }
    } catch (err) {
      // token invalid or expired: treat as logged out (idempotent)
    }

    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    next(err);
  }
};
