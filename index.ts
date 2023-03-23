import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express, { Express, Request, Response, NextFunction } from "express";
import multer from "multer";
import mongoose from "mongoose";

import {
  createUser,
  login,
  updateUser,
  getUser,
} from "./controllers/userController";
import {
  uploadRecipt,
  getAllRecipts,
  getRecipt,
  getReciptsByUsername,
  deleteRecipt,
  updateRecipt,
} from "./controllers/receiptController";

const app: Express = express();
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://susan-travel-to-class-expense.netlify.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const upload = multer();

app.post("/login", login);
app.get("/users/:id", getUser);
app.post("/users/create", createUser);
app.put("/users/:id", updateUser);

app.get("/receipts", getAllRecipts);
app.post("/receipts/upload", upload.single("file"), uploadRecipt);
app.get("/receipts/:id", getRecipt);
app.get("/receipts/user/:username", getReciptsByUsername);
app.put("/receipts/:id", updateRecipt);
app.delete("/receipts/:id", deleteRecipt);

const connectToDateBase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on post", process.env.PORT);
    });
  } catch (err) {
    console.log(err);
  }
};

connectToDateBase();
