import express from "express";
import { seedDatabaseWithUsers } from "../controllers/seeders";

const router = express.Router();

router.post("/", seedDatabaseWithUsers);

export default router;
