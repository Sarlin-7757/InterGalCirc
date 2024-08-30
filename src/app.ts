import express from "express";
import {config} from "dotenv"
import appRouter from "./routes"
import morgan from "morgan";
config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("api/",appRouter);

export default app;