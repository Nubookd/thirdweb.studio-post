import jwt from "jsonwebtoken";
import UserModel from "./userModel";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET environment variables are not set");
}

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1s" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};

const refreshTokens = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  console.log(decoded)

  const storedToken = await UserModel.findRefreshToken(refreshToken);
  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  const user = await UserModel.findUserById(decoded.user_id);
  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = generateAccessToken({
    user_id: user.user_id,
    name: user.user_name,
    email: user.user_email,
  });

  const newRefreshToken = generateRefreshToken({
    user_id: user.user_id,
    name: user.user_name,
    email: user.user_email,
  });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await UserModel.updateRefreshToken(refreshToken, newRefreshToken, expiresAt);

  // await UserModel.saveRefreshToken(user.user_id, newRefreshToken, expiresAt);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};
const jwtUtils = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  refreshTokens,
};

export default jwtUtils