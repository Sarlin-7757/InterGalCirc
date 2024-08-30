import { Router } from "express";
import { addInventory, getAllInventory, getInventoryByStationId, } from "../controllers/inventory.controllers";

const  inventoryRouter = Router();

inventoryRouter.post("/", addInventory );
inventoryRouter.get("/", getAllInventory);
inventoryRouter.get("/:stationId",getInventoryByStationId);

export default inventoryRouter;