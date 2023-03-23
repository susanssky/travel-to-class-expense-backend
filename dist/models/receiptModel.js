"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const receiptSchema = new Schema({
    imgOriginalName: { type: String, required: true },
    format: { type: String, required: true },
    imgCloudinaryBaseName: { type: String, required: true },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    status: { type: String, required: true },
    username: { type: String, required: true },
    nameOnBankAccount: { type: String, required: true },
    accountNumber: { type: String, required: true },
    sortCodeWithDashes: { type: String, required: true },
    amount: { type: String, required: true },
}, { timestamps: true });
exports.default = receiptSchema;
