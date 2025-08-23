import express from "express";
import {getTransactionsByUserId, createTransaction,deleteTransaction, getSummaryByUserId} from "../controllers/transactionsController.js";
const router = express.Router();

router.post("/", createTransaction);

router.get("/:userId", getTransactionsByUserId);

router.delete("/:id", deleteTransaction);

router.get("/summary/:userId", getSummaryByUserId);



export default router;