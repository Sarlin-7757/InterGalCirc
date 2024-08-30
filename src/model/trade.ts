import mongoose, { Document, Model, Schema } from 'mongoose';
export interface Trade {
    transactionId: string;
    buyer: string;
    seller: string;
    items: string[];
    status: 'pending' | 'completed' | 'cancelled';
    timestamp: Date;
  }
  
const tradeSchema = new mongoose.Schema({
    transactionId: { type: String, required: true, unique: true },
    buyer: { type: String, required: true },

    seller: { type: String, required: true },
    items: [{ type: String, required: true }],
    status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'] },
    timestamp: { type: Date, default: Date.now }
  });
  

export default mongoose.model("Trade", tradeSchema);