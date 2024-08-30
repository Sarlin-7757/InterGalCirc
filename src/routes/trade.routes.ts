import { Router } from "express";
import { initiateTrade } from "../controllers/trades.controllers";

const tradeRouter = Router();

tradeRouter.get("/", initiateTrade);
tradeRouter.get("/{transactionId}",);
export default tradeRouter;