"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    nameOnBankAccount: { type: String, required: true },
    accountNumber: { type: String, required: true },
    sortCodeWithDashes: { type: String, required: true },
    amount: { type: String, required: true },
}, { timestamps: true });
exports.default = userSchema;
