import { Router } from "express";
import { getAllCargos, getCargoById, updateCargo } from "../controllers/cargo.controllers";


const cargoRouter = Router();

cargoRouter.get("/", getAllCargos)
cargoRouter.get("/:shipmentId",getCargoById);
cargoRouter.put("/update/:shipmentId",updateCargo);

export default cargoRouter;