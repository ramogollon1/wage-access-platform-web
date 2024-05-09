import express from "express";
import { submitRequest } from "../controllers/request";

const router = express.Router();

router.post("/", submitRequest);

export default router;
