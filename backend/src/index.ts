import express, { Request, Response } from "express";
import {
  getAvailableBalance,
  requestWageAccess,
} from "./controllers/wageController";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Wage Access Platform backend!");
});

app.get("/balance", getAvailableBalance);
app.post("/request", requestWageAccess);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
