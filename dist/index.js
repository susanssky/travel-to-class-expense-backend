"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mongoose_1 = __importDefault(require("mongoose"));
const userController_1 = require("./controllers/userController");
const receiptController_1 = require("./controllers/receiptController");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://susan-travel-to-class-expense.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const upload = (0, multer_1.default)();
app.post("/login", userController_1.login);
app.get("/users/:id", userController_1.getUser);
app.post("/users/create", userController_1.createUser);
app.put("/users/:id", userController_1.updateUser);
app.get("/receipts", receiptController_1.getAllRecipts);
app.post("/receipts/upload", upload.single("file"), receiptController_1.uploadRecipt);
app.get("/receipts/:id", receiptController_1.getRecipt);
app.get("/receipts/user/:username", receiptController_1.getReciptsByUsername);
app.put("/receipts/:id", receiptController_1.updateRecipt);
app.delete("/receipts/:id", receiptController_1.deleteRecipt);
const connectToDateBase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL);
        app.listen(process.env.PORT, () => {
            console.log("connected to db & listening on post", process.env.PORT);
        });
    }
    catch (err) {
        console.log(err);
    }
};
connectToDateBase();
