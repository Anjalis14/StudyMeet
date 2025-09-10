import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); 
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port",process.env.PORT || 8000);

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:"true"}));

app.use("/api/v1/users",userRoutes);
// app.get("/home", (req ,res)=>{
//     res.send("Hello world");
// });

const start= async ()=> {
  const connectionDb = await mongoose.connect(process.env.URL);
  console.log("database connected");
  server.listen(app.get("port"), () => {
    console.log("server is running on port", app.get("port"));
  });
};
start();
