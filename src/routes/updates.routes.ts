import { Router, Request, Response } from 'express';
import { realTimeUpdateDetailFunction } from '../controllers/updates.controllers';

const updatesrouter = Router();
updatesrouter.get('/real-time',realTimeUpdateDetailFunction);

export default updatesrouter;
