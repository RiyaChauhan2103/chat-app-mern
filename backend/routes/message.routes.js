import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getMessages, sendMessage } from "../controllers/message.Controller.js";
const router = express.Router();

router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:userId", isAuthenticated, sendMessage);

export default router;
