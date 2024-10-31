import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getUsersForSidebar } from "../controllers/user.Controller.js";
const router = express.Router();

router.get("/", isAuthenticated, getUsersForSidebar);

export default router;
