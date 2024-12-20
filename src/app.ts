import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", router);

const getController = async (req: Request, res: Response) => {
  res.send("This is Blog Assignment-3 is running");
  console.log("Req.User: ", req.user);
};

app.get("/", getController);

//Global Error Handler
app.use(globalErrorHandler);
//Not Found Route
app.use(notFound);
export default app;
