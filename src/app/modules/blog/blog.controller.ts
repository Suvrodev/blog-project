import { Request, RequestHandler, Response } from "express";
import { BlogServices } from "./blog.service";

///Create Blog
const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    console.log("Logged User: ", loggedUser);
    const result = await BlogServices.createBlogIntoDB(req.body);
    console.log("Result: ", result); // Full Mongoose Document
    const newResult = result.toObject();
    console.log("New Result: ", newResult);

    // Structure the result to add loggedUser inside the author details
    const newResultWithUser: any = {
      ...newResult,
      author: {
        details: loggedUser, // Add loggedUser inside the author.details field
      },
    };

    console.log("New Result with User: ", newResultWithUser);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: newResultWithUser,
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
    const id = req.params.id;
    const result = await BlogServices.deleteBlogFromDB(id);
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
    const { role } = req.user;
    // console.log("Logged User Role: ", role);
    if (role === "Admin") {
      throw new Error("Admin can not update blog");
    }

    const id = req.params.id;
    const result = await BlogServices.updateBlogIntoDB(id, req.body);
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
