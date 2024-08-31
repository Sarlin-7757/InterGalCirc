import { Request, Response } from 'express';
import Cargo from '../model/cargo';
import cargoEventEmitter from '../events/cargoEventEmitter';

// Update Cargo endpoint
export const updateCargo = async (req: Request, res: Response) => {
  const { shipmentId } = req.params;
  const updateData = req.body;

  try {
    const updatedCargo = await Cargo.findOneAndUpdate(
      { shipmentId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedCargo) {
      return res.status(404).json({ message: 'Cargo not found' });
    }

    cargoEventEmitter.emit('cargoUpdated', updatedCargo);

    return res.status(200).json({
      message: 'Cargo updated successfully',
      cargo: updatedCargo,
    });
  } catch (error) {
    console.error("Error updating cargo:", error);
    return res.status(500).json({ message: 'Error updating cargo', error: (error as Error).message });
  }
};


export const getCargoById = async (req: Request, res: Response) => {
    const { shipmentId } = req.params;

    try {
        const cargoItem = await Cargo.findOne({ shipmentId });

        if (!cargoItem) {
            return res.status(404).json({ message: "Cargo not found for the shipment ID" });
        }

        return res.status(200).json({ message: "Successfully found Cargo Item", cargoItem });
    } catch (error) {
        return res.status(500).json({ message: "Error receiving cargo data", error });
    }
};

export const getAllCargos = async (req: Request, res: Response) => {
    try {
        const cargos = await Cargo.find({});
        
        if (cargos.length === 0) {
            return res.status(404).json({ message: "No cargo items found" });
        }

        return res.status(200).json({ message: "Successfully retrieved all cargo items", cargos });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving cargo data", error });
    }
};

