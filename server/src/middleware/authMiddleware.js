// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];

//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Find user from token
//       const user = await User.findById(decoded.id).select("-password");

//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       req.user = user;
//       return next();
//     }

//     // No token found
//     return res.status(401).json({ message: "No token, authorization denied" });
//   } catch (error) {
//     console.error("Auth error:", error);
//     return res.status(401).json({ message: "Not authorized, token invalid" });
//   }
// };


import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "No token, authorization denied" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password -refreshTokens -firebaseId");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};
