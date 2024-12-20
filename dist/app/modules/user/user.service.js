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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
///Create User into db
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("Payload: ", payload);
    const result = yield user_model_1.userModel.create(payload);
    return result;
});
//Get All User from DB
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    return result;
});
//Login User from DB
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findOne();
});
exports.userServices = {
    registerUserIntoDB,
    getAllUser,
};
