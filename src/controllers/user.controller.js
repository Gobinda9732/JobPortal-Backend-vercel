import bcrypt from "bcryptjs";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/apiResponse.js";
import { hashedPassword, validatePassword } from "../utils/utility.js";
import { generateToken } from "../utils/jwtVerification.js";

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("hiii");

      const response = new ApiError(
        401,
        "User Already Exist", // This is the 'message' argument
        []                    // This is the 'errors' argument
      );
      console.log(response);

      return res.status(response.statusCode).json(response.message);
    }
    const hashPassword = hashedPassword(password);
    const user = await User.create({
      email,
      name,
      password: hashPassword,
    });

    const response = new ApiResponse(201, "User Registered Successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    return res.status(response.statusCode).json(response);
  } catch (error) {
    const response = new ApiError(
      500,
      "Internal Server Error",
      error,
      error.message
    );
    return res.status(response.statusCode).json(response);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const response = new ApiError(
        404,
        "User Not Found",
        "No user found with the provided email"
      );
      return res.status(response.statusCode).json(response);
    }

    const isPasswordValid = validatePassword(password, user.password);
    if (!isPasswordValid) {
      const response = new ApiError(
        401,
        "Invalid Credentials",
        "The password you entered is incorrect"
      );
      return res.status(response.statusCode).json(response);
    }
    const token = generateToken({
      email: user.email,
      _id: user._id,
    });
    res.cookie("token", token);

    const response = new ApiResponse(200, "Login Success", {
      _id: user._id,
      token,
    });
    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.log(error);

    const response = new ApiError(
      500,
      "Internal Server Error",
      error,
      error.message
    );
    return res.status(response.statusCode).json(response);
  }
};

export { loginUser, registerUser };
