import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import Trade from "../model/trade";
import tradeEventEmitter from "../events/eventEmitter";
import Inventory from "../model/inventory";
import mongoose from "mongoose";

export const initiateTrade = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const transactionId = uuidv4();
    const { buyer, seller, items, status } = req.body;

    // Validate request body
    if (!buyer || !seller || !items || !Array.isArray(items)) {
      throw new Error("Invalid request data. Buyer, seller, and items are required.");
    }

    // Create a new Trade document
    const newTrade = new Trade({
      transactionId,
      buyer,
      seller,
      items,
      status: status || 'pending',
      timestamp: new Date(),
    });

    // Save the trade to the database
    await newTrade.save({ session });

    // Log buyer and seller information for debugging
    console.log("Buyer:", buyer);
    console.log("Seller:", seller);
    console.log("Items:", items);

    // Update the buyer's inventory
    const buyerInventory = await Inventory.findOne({ stationId: buyer }).session(session);
    if (buyerInventory) {
      items.forEach((item: string) => {
        if (!buyerInventory.items.includes(item)) {
          buyerInventory.items.push(item);
        }
        buyerInventory.quantity += 1; // Increase buyer’s inventory
      });
      await buyerInventory.save({ session });
    } else {
      console.error("Buyer inventory not found for stationId:", buyer);
      throw new Error("Buyer inventory not found");
    }

    // Update the seller's inventory
    const sellerInventory = await Inventory.findOne({ stationId: seller }).session(session);
    if (sellerInventory) {
      items.forEach((item: string) => {
        const itemIndex = sellerInventory.items.indexOf(item);
        if (itemIndex > -1) {
          sellerInventory.quantity -= 1; // Decrease seller’s inventory
          if (sellerInventory.quantity <= 0) {
            sellerInventory.items.splice(itemIndex, 1);
            sellerInventory.quantity = 0;
          }
        }
      });
      await sellerInventory.save({ session });
    } else {
      console.error("Seller inventory not found for stationId:", seller);
      throw new Error("Seller inventory not found");
    }

    await session.commitTransaction();
    session.endSession();
    tradeEventEmitter.emit('tradeInitiated', newTrade);

    return res.status(201).json({
      message: "Trade initiated successfully and inventory updated",
      trade: newTrade,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error("Error details:", error);

    return res.status(500).json({ message: "Error initiating trade and updating inventory", error: (error as Error).message });
  }
};

export const getTradeDetailById = async (req: Request , res: Response) =>{
    try{
        const {transactionId}= req.params;
    
        const trade = await Trade.findOne({transactionId});

        if(!trade){
            return res.status(404).json({message: "Trade not found for the transaction ID" });
        }
        return res.status(200).json({message: "Trade data received successfully", trade})
    }catch(error){
        return res.status(500).json({message: "Error receiving trade data", error});
    }
    
}

export const getAllTradeData = async (req:Request , res: Response) =>{
    try{
        const tradeData = await Trade.find();

        return res.status(200).json({message: "All the trade data received successfully", tradeData});
    }catch(error){
        return res.status(500).json({message: "Error receiving trade data", error})
    }
};