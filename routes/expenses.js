// Used Modular SDK in FirebaseConfig and Controllers. Hence maintaining ES Module syntax throughout.
import {getExpense, createExpense, updateExpense, deleteExpense} from '../controllers/expenseController.js';
import express from 'express';

let router = express.Router();

router.get("/", getExpense)

router.post("/", createExpense)

router.put("/:id", updateExpense)

router.delete("/:id", deleteExpense)

export default router;