const {getIncome, createIncome, updateIncome, deleteIncome} = require('../controllers/incomeController');
const express = require('express');

let router = express.Router();

router.get("/", getIncome)

router.post("/", createIncome)

router.put("/:id", updateIncome)

router.delete("/:id", deleteIncome)

module.exports = router;