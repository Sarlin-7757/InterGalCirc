
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Inventory {
  stationId: string;
  planet: string;
  items: string[];
  quantity: number;
}

const inventorySchema = new mongoose.Schema({
  stationId: { type: String, required: true, unique: true },
  planet: { type: String, required: true },
  items: [{ type: String, required: true }],
  quantity: { type: Number, required: true }
});

export default mongoose.model('Inventory', inventorySchema)