import { RequestHandler } from "express";
import { AuthServices } from "./auth.service";
import AppError from "../../errors/AppError";

//Login User
const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await AuthServices.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        token: result?.accessToken,
      },
    });
  } catch (error: any) {
    next(error);
    // throw new AppError(401, error);
  }
};

export const AuthControllers = {
  loginUser,
};
