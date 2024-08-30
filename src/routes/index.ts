import { Router } from "express";
import tradeRouter from "./trade.routes";
import cargoRouter from "./cargo.routes";
import inventoryRouter from "./inventory.routes";
import updatesRouter from "./updates.routes";

const appRouter = Router();

appRouter.use("/trades",tradeRouter);
appRouter.use("/cargo", cargoRouter);
appRouter.use("/inventory",inventoryRouter)
appRouter.use("/updates",updatesRouter)


export default appRouter;