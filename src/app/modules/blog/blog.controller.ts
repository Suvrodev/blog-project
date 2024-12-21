import { Request, RequestHandler, Response } from "express";
import { BlogServices } from "./blog.service";
import AppError from "../../errors/AppError";

///Create Blog
const createBlog: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser = req?.user;
    // console.log("*************************");
    // console.log("Logged User: ", loggedUser);

    //if Logged user will be admin can not create blog
    if (loggedUser?.role === "admin") {
      throw new AppError(403, "admin is unable to create blog");
    }
    const blogData = req?.body;
    blogData.author = loggedUser?.id;
    // console.log("Blog data: ", blogData);
    const result = await BlogServices.createBlogIntoDB(blogData);
    // console.log("Result: ", result); // Full Mongoose Document

    //copy of result in newResult
    const newResult = result.toObject();
    // console.log("New Result: ", newResult);

    ///Remove lat and exp from logged user (from token) as cleanedAuthor
    const { iat: _iat, exp: _exp, ...cleanedAuthor } = loggedUser;

    ///Attact author info in newResult as newResultWithUser
    const newResultWithUser: any = {
      ...newResult,
      author: cleanedAuthor, // Add loggedUser inside the author.details field
    };

    //Remove isPublished, createdAt, updatedAt, __v, from newResultWithUser as finalResult
    const { isPublished, createdAt, updatedAt, __v, ...finalResult } =
      newResultWithUser;

    console.log("Final Result: ", finalResult);

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

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: result,
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
    const loggedUser = req?.user;
    // console.log("***********************");
    // console.log("Logged User: ", loggedUser);
    const loggedUserId = loggedUser?.id;
    if (loggedUser?.role === "admin") {
      throw new AppError(500, "admin can not update blog");
    }

    const id = req.params.id;
    const result = await BlogServices.updateBlogIntoDB(
      id,
      req.body,
      loggedUserId
    );

    // console.log("Result from controller: ", result);

    //copy of result in newResult
    let newResult;
    if (result) {
      newResult = result.toObject();
    }

    ///Remove lat and exp from logged user (from token) as cleanedAuthor
    const { iat: _iat, exp: _exp, ...cleanedAuthor } = loggedUser;

    ///Attact author info in newResult as newResultWithUser
    const newResultWithUser: any = {
      ...newResult,
      author: cleanedAuthor, // Add loggedUser inside the author.details field
    };
    // console.log("New result with User: ", newResultWithUser);

    //Remove isPublished, createdAt, updatedAt, __v, from newResultWithUser as finalResult
    const { isPublished, createdAt, updatedAt, __v, iat, exp, ...finalResult } =
      newResultWithUser;
    console.log("Final Result: ", finalResult);

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      statusCode: 200,
      data: finalResult,
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
