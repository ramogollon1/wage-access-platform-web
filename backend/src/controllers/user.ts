import { Request, Response } from "express";
import pool from "../db";

export async function getUsers(req: Request, res: Response) {
  try {
    const usersResult = await pool.query("SELECT * FROM users");
    const users = usersResult.rows;
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
