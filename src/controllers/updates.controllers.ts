import { Request, Response } from 'express';
import tradeEventEmitter from '../events/eventEmitter';
import cargoEventEmitter from '../events/cargoEventEmitter';

export const realTimeUpdateDetailFunction = (req: Request, res: Response) => {
    // Set headers for Server-Sent Events (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    // Send a message to confirm the connection is established
    res.write('data: Connection established\n\n');
  
    // Function to handle and send updates
    const updateListener = (update: any) => {
        res.write(`data: ${JSON.stringify(update)}\n\n`);
    };
  
    // Attach event listeners for updates
    tradeEventEmitter.on('tradeInitiated', updateListener);
    cargoEventEmitter.on('cargoUpdated', updateListener);
  
    req.on('close', () => {
        tradeEventEmitter.off('tradeInitiated', updateListener);
        cargoEventEmitter.off('cargoUpdated', updateListener);
        res.end();
    });
};
