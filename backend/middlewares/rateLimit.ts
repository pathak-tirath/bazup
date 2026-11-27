import { NextFunction, Request, Response } from "express";
import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../utils/arcjet.ts";

const limiter = async (req: Request, res: Response, next: NextFunction) => {
  
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "No Bots allowed" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    } 
    
    if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    next(error);
  }

};


export default limiter;
