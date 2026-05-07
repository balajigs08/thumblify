import { Request, Response, NextFunction } from "express";

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    console.log("SESSION:", req.session);

    // ✅ CHECK LOGIN
    if (
      !req.session.userId ||
      !req.session.isLoggedIn
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ USER AUTHORIZED
    next();

  } catch (error: any) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default protect;