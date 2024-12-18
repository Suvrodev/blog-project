import { Request, RequestHandler, Response } from "express";
import { BlogServices } from "./blog.service";

///Create Blog
const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const result = await BlogServices.createBlogIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    // res.status(401).json({
    //   success: false,
    //   message: error,
    // });
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
      data: result,
    });
  } catch (error) {
    // res.status(401).json({
    //   success: false,
    //   message: error,
    // });
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
    // res.status(401).json({
    //   success: false,
    //   message: error,
    // });
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
    // res.status(401).json({
    //   success: false,
    //   message: error,
    // });
    next(error);
  }
};

//Update Blog
const updateBlog: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await BlogServices.updateBlogIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error,
    });
  }
};

export const blogControllers = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
