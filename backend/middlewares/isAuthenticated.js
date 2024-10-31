import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ error: "unauthorized -no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized : invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`error in authentication middleware ${error.message}`);
    res.status(500).json({ error: "internal server error" });
  }
};
export default isAuthenticated;
