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
exports.adminControllers = void 0;
const admin_service_1 = require("./admin.service");
//make user blocked
const makeUserBlockByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield admin_service_1.adminServices.makeUserBlockedIntoDBByAdmin(userId, req.body);
        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        // res.status(401).json({
        //   success: false,
        //   message: error,
        // });
        next(error);
    }
});
//Delete Blog
const deleteBlogByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const result = admin_service_1.adminServices.deleteBlogFromDBByAdmin(id);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        // res.status(401).json({
        //   success: false,
        //   message: error,
        // });
        next(error);
    }
});
exports.adminControllers = {
    makeUserBlockByAdmin,
    deleteBlogByAdmin,
};
