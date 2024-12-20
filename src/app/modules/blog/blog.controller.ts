import { Request, RequestHandler, Response } from "express";
import { BlogServices } from "./blog.service";
import AppError from "../../errors/AppError";

///Create Blog
const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req?.user;
    console.log("Logged User: ", loggedUser);
    if (loggedUser?.role === "Admin") {
      throw new AppError(403, "Admin is unable to create blog");
    }
    const blogData = req?.body;
    blogData.author = loggedUser?.id;
    console.log("Blog data: ", blogData);
    const result = await BlogServices.createBlogIntoDB(blogData);
    // console.log("Result: ", result); // Full Mongoose Document
    const newResult = result.toObject();
    // console.log("New Result: ", newResult);

    // Structure the result to add loggedUser inside the author details
    const newResultWithUser: any = {
      ...newResult,
      author: loggedUser, // Add loggedUser inside the author.details field
    };
    const { isPublished, createdAt, updatedAt, __v, ...finalResult } =
      newResultWithUser;

    // console.log("New Result with User: ", newResultWithUser);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: finalResult,
    });
  } catch (error) {
    next(error);
  }
};

//Get All Blog
const getAllBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogServices.getAllBlogsFromDB(req.query);
    res.status(201).json({
      success: true,
      message: "Blog retrive successfully",
      statusCode: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

//Get Single Blog
const getSingleBlog: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await BlogServices.getSingleBlogFromDB(id);
    res.status(201).json({
      success: true,
      message: "Blog retrive successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Delete Blog
const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const { id: loggedUserId } = req.user;
    const id = req.params.id;
    const result = await BlogServices.deleteBlogFromDB(id, loggedUserId);
    res.status(201).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

//Update Blog
const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    const { role, id: loggedUserId } = req.user;
    // console.log("Logged User Role: ", role);
    if (role === "Admin") {
      throw new AppError(500, "Admin can not update blog");
    }

    const id = req.params.id;
    const result = await BlogServices.updateBlogIntoDB(
      id,
      req.body,
      loggedUserId
    );
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const blogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
