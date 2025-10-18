// server/utils/generateToken.js

import jwt from "jsonwebtoken";

/**
 * Access Token — short lifespan (1 hour)
 * Used for authenticating API requests.
 */
export const signAccessToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

/**
 * Refresh Token — long lifespan (30 days)
 * Used to issue new access tokens without re-login.
 */
export const signRefreshToken = (userId) => {
  if (!process.env.REFRESH_SECRET) {
    throw new Error("REFRESH_SECRET not set in environment variables");
  }

  return jwt.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: "30d" });
};
