import { Request, Response } from "express";
import { adminServices } from "./admin.service";

//make user blocked
const makeUserBlockByAdmin = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await adminServices.makeUserBlockedIntoDBByAdmin(
      userId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

//Delete Blog
const deleteBlogByAdmin = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    const result = adminServices.deleteBlogFromDBByAdmin(id);
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

export const adminControllers = {
  makeUserBlockByAdmin,
  deleteBlogByAdmin,
};
