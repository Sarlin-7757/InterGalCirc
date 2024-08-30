
import mongoose, { Document, Model, Schema } from 'mongoose';


export interface Cargo {
  shipmentId: string;
  origin: string;
  destination: string;
  items: string[];
  status: 'pending' | 'in_transit' | 'delivered';
  ETA: Date;
}
const cargoSchema = new mongoose.Schema({
    shipmentId: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    items: [{ type: String, required: true }],
    status: { type: String, required: true, enum: ['pending', 'in_transit', 'delivered'] },
    ETA: { type: Date, required: true }
  });

  export default mongoose.model("Cargo", cargoSchema);