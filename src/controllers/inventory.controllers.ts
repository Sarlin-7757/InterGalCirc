import { Request, Response } from "express";
import Inventory from "../model/inventory";

export const addInventory = async (req: Request, res: Response) => {
  try {
    const { stationId, planet, items, quantity } = req.body;

    const newInventory = new Inventory({
      stationId,
      planet,
      items,
      quantity,
    });

    await newInventory.save();

    return res.status(201).json({
      message: "Inventory added successfully",
      inventory: newInventory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error adding inventory", error });
  }
};

export const getAllInventory = async (req: Request, res: Response) => {
    try {
      const inventories = await Inventory.find();
      return res.status(200).json({
        message: "Inventory data retrieved successfully",
        inventories,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving inventory data", error });
    }
};

export const getInventoryByStationId = async (req: Request, res: Response) => {
  const { stationId } = req.params;

  try {
    const inventory = await Inventory.findOne({ stationId });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found for the given station ID" });
    }

    return res.status(200).json({
      message: "Inventory data retrieved successfully",
      inventory,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving inventory data", error });
  }
};
