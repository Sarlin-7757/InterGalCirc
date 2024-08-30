import { Request, Response } from "express"

export const initiateTrade = (req:Request ,res:Response)=>{
   return res.status(200).json({"message": "Hey! This API got HIT !!!!!"});
}