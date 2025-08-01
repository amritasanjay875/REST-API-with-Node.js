const express = require('express');
const {getUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/userController');

let router = express.Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.put("/:id", updateUsers);

router.delete("/:id", deleteUsers);

module.exports = router;