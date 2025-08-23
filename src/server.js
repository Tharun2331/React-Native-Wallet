import express from "express";
import dotenv from "dotenv";
import {sql} from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js";
import {initDB} from "./config/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;
// middleware
app.use(ratelimiter);
app.use(express.json());
app.use("/api/transaction", transactionRoute)



initDB().then(()=> {
  app.listen(PORT, () => {
    console.log("Server is running on on PORT:", PORT);
  }) 
})

