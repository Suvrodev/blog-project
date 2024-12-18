import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

//Parser
app.use(express.json());
app.use(cors());

const getController = async (req: Request, res: Response) => {
  res.send("This is Blog Assignment-3 is running");
};

app.get("/", getController);
export default app;
