const {getExpense, createExpense, updateExpense, deleteExpense} = require('../controllers/expenseController');
const express = require('express');

let router = express.Router();

router.get("/", getExpense)

router.post("/", createExpense)

router.put("/:id", updateExpense)

router.delete("/:id", deleteExpense)

module.exports = router;