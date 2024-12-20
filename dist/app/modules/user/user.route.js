"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userValidation_1 = require("./userValidation");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const router = express_1.default.Router();
// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync(req.body);
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };
router.post("/", (0, validateRequest_1.default)(userValidation_1.userValidations.userValidationSchema), user_controller_1.userControllers.registerUser);
router.get("/register", user_controller_1.userControllers.getAllUsers);
exports.userRoutes = router;
