import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./app/modules/user/user.route";
import router from "./app/routes";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

//application routes
app.use("/api", router);

const getController = async (req: Request, res: Response) => {
  res.send("This is Blog Assignment-3 is running");
};

app.get("/", getController);
export default app;
