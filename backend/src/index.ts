import express, { Request, Response } from "express";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import balanceRoutes from "./routes/balance";
import requestRoutes from "./routes/request";
import currencyRatesRoutes from "./routes/currencyRates";
import { seedDatabaseWithUsers } from "./controllers/seeders";

const app = express();
const cors = require("cors");
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// fill database with mock data
seedDatabaseWithUsers();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Wage Access Platform backend!");
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/users", userRoutes);
app.use("/balance", balanceRoutes);
app.use("/request", requestRoutes);
app.use("/currency-rates", currencyRatesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
