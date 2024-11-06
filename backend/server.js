import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";
import path from "path";
// const app = express();

import cookieParser from "cookie-parser";
import { server, app } from "./socket/socket.js";
const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello world");
// });
//* middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000/",
    credentials: true,
  })
);
//*routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});
