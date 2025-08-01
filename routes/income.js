// Used Modular SDK in FirebaseConfig and Controllers. Hence maintaining ES Module syntax throughout.
import {getIncome, createIncome, updateIncome, deleteIncome} from '../controllers/incomeController.js';
import express from 'express';

let router = express.Router();

router.get("/", getIncome)

router.post("/", createIncome)

router.put("/:id", updateIncome)

router.delete("/:id", deleteIncome)

export default router;