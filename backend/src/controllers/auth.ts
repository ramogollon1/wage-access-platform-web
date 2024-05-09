import { Request, Response } from "express";
import { preRegisteredUsers } from "../utils/constants";

export function authenticateUser(req: Request, res: Response, next: Function) {
  const { userID } = req.body;

  if (preRegisteredUsers.includes(userID)) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
