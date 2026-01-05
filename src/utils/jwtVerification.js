import jwt from "jsonwebtoken";
import ApiError from "./apiError.js";

const generateToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      const response = new ApiError(401, "Token is not provided");
      return res.status(response.statusCode).json(response);
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
    next();
  } catch (error) {
    const response = new ApiError(401, "Invalid Token!", error.message);
    return res.status(response.statusCode).json(response);
  }
};
export { generateToken, verifyToken };
