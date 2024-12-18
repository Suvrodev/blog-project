import { Request, Response } from "express";
import { userServices } from "./user.service";

///Register User
const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const result = await userServices.registerUserIntoDB(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      statusCode: 400,
      error: error,
      stack: "error stack",
    });
  }
};

export const userControllers = {
  registerUser,
};
