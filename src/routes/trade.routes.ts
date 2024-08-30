import { Router } from "express";
import { getAllTradeData, getTradeDetailById, initiateTrade } from "../controllers/trades.controllers";

const tradeRouter = Router();

tradeRouter.get("/", getAllTradeData);
tradeRouter.post("/", initiateTrade);
tradeRouter.get("/:transactionId", getTradeDetailById);

export default tradeRouter;