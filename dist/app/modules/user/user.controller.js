"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
///Register User
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_service_1.userServices.registerUserIntoDB(userData);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        // res.status(400).json({
        //   success: false,
        //   message: error.message || "Validation error",
        //   statusCode: 400,
        //   error: error,
        //   stack: "error stack",
        // });
        next(error);
    }
});
//Get All User
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUser();
        res.status(201).json({
            success: true,
            message: "Users Retrived successfully",
            statusCode: 201,
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrive students",
            statusCode: 400,
            error: error,
            stack: "error stack",
        });
    }
});
exports.userControllers = {
    registerUser,
    getAllUsers,
};
