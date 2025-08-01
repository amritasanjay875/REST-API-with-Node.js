// Used Modular SDK in FirebaseConfig and Controllers. Hence maintaining ES Module syntax throughout.
import {getUsers, createUsers, updateUsers, deleteUsers} from '../controllers/userController.js';
import express from 'express';

let router = express.Router();

router.get("/", getUsers);

router.post("/", createUsers);

router.put("/:id", updateUsers);

router.delete("/:id", deleteUsers);

export default router;