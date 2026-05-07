import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================
export const registerUser = async (
  req: Request,
  res: Response
) => {

  try {

    const { name, email, password } = req.body;

    // ✅ VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ CHECK EXISTING USER
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // ✅ HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(password, salt);

    console.log(
      "HASHED PASSWORD:",
      hashedPassword
    );

    // ✅ CREATE USER
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ✅ CREATE SESSION
    req.session.isLoggedIn = true;

    req.session.userId =
      newUser._id.toString();

    return res.json({
      message: "Account created successfully",

      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN =================
export const loginUser = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password } = req.body;

    // ✅ VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // ✅ FIND USER
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ✅ CHECK PASSWORD
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password as string
      );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // ✅ CREATE SESSION
    req.session.isLoggedIn = true;

    req.session.userId =
      user._id.toString();

    return res.json({
      message: "Login successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGOUT =================
export const logoutUser = async (
  req: Request,
  res: Response
) => {

  try {

    req.session.destroy((err) => {

      if (err) {

        return res.status(500).json({
          message: "Logout failed",
        });
      }

      // ✅ CLEAR COOKIE
      res.clearCookie("connect.sid", {
        path: "/",
      });

      return res.json({
        message: "Logout successful",
      });
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ================= VERIFY USER =================
export const verifyUser = async (
  req: Request,
  res: Response
) => {

  try {

    // ✅ CHECK SESSION
    if (
      !req.session.isLoggedIn ||
      !req.session.userId
    ) {

      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // ✅ FIND USER
    const user = await User.findById(
      req.session.userId
    ).select("-password");

    if (!user) {

      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.json({
      message: "User verified",
      user,
    });

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};