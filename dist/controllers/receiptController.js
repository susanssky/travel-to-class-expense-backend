"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecipt = exports.updateRecipt = exports.getReciptsByUsername = exports.getRecipt = exports.uploadRecipt = exports.getAllRecipts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const receiptModel_1 = __importDefault(require("../models/receiptModel"));
const Receipt = mongoose_1.default.model("receipts", receiptModel_1.default);
const getAllRecipts = async (req, res) => {
    const receipts = await Receipt.find({}).sort({ createdAt: -1 });
    res.status(200).json(receipts);
};
exports.getAllRecipts = getAllRecipts;
const uploadRecipt = async (req, res) => {
    try {
        const { secure_url, original_filename, public_id, username, nameOnBankAccount, accountNumber, sortCodeWithDashes, amount, format, } = req.body;
        if (!secure_url || !original_filename) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        console.log(req.body);
        const receipt = await Receipt.create({
            username,
            imgOriginalName: original_filename,
            imgCloudinaryBaseName: public_id.split("/").pop(),
            format,
            public_id,
            url: secure_url,
            status: `In Progress`,
            nameOnBankAccount,
            accountNumber,
            sortCodeWithDashes,
            amount,
        });
        res.status(200).json(receipt);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload image" });
    }
};
exports.uploadRecipt = uploadRecipt;
const getRecipt = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid recipt" });
    }
    const receipt = await Receipt.findById({ _id: id });
    if (!receipt) {
        return res.status(400).json({ error: "Invalid receipt" });
    }
    res.status(200).json(receipt);
};
exports.getRecipt = getRecipt;
const getReciptsByUsername = async (req, res) => {
    const { username } = req.params;
    const receipts = await Receipt.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(receipts);
};
exports.getReciptsByUsername = getReciptsByUsername;
const updateRecipt = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid recipt" });
    }
    const receipt = await Receipt.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!receipt) {
        return res.status(400).json({ error: "Invalid receipt" });
    }
    res.status(200).json(receipt);
};
exports.updateRecipt = updateRecipt;
const deleteRecipt = async (req, res) => {
    const { id } = req.params;
    const { public_id } = req.body;
    const deletionResult = await cloudinary_1.v2.uploader.destroy(public_id);
    console.log(deletionResult);
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Can't find this receipt" });
    }
    const receipts = await Receipt.findOneAndDelete({ _id: id });
    res.status(200).json(receipts);
};
exports.deleteRecipt = deleteRecipt;
