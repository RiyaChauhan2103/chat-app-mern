import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getUsersForSidebar } from "../controllers/user.Controller.js";
const router = express.Router();

router.get("/us", (req, res) => {
  res.status(200).json({ msg: "welcome" });
});
router.get("/getusers", isAuthenticated, getUsersForSidebar);

export default router;
