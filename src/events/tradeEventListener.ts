import tradeEventEmitter from './eventEmitter';
import Cargo from '../model/cargo';
import Inventory from '../model/inventory';


tradeEventEmitter.on('tradeInitiated', async (trade) => {
    try {
      const newCargo = new Cargo({
        shipmentId: `shipment-${trade.transactionId}`,
        origin: trade.seller,
        destination: trade.buyer,
        items: trade.items,
        status: 'pending',
        ETA: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      });
  
      await newCargo.save();
  
      await Inventory.updateOne(
        { stationId: trade.buyer },
        {
          $inc: { quantity: trade.items.length },
          $addToSet: { items: { $each: trade.items } }
        }
      );
      
      // Update inventory for the seller
      await Inventory.updateOne(
        { stationId: trade.seller },
        {
          $inc: { quantity: -trade.items.length },
          $pullAll: { items: trade.items }
        }
      );
      console.log(`Cargo created and inventory updated for trade ${trade.transactionId}`);
    } catch (error) {
      console.error("Error processing trade event:", error);
    }
  });