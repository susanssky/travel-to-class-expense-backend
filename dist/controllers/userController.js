"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.updateUser = exports.login = exports.createUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = mongoose_1.default.model("users", userModel_1.default);
const createUser = async (req, res) => {
    const { username, password, nameOnBankAccount, accountNumber, sortCodeWithDashes, amount, } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: `Username already exists` });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            nameOnBankAccount,
            accountNumber,
            sortCodeWithDashes,
            amount,
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createUser = createUser;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const findUser = await User.findOne({ username });
        if (!findUser) {
            return res.status(400).json({ message: "Invalid username" });
        }
        const isCorrectPW = await bcrypt_1.default.compare(password, findUser.password);
        if (!isCorrectPW) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const _a = findUser.toObject(), { password: _, createdAt, updatedAt, __v } = _a, rest = __rest(_a, ["password", "createdAt", "updatedAt", "__v"]);
        // console.log(rest);
        res.status(200).json(rest);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.login = login;
const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user" });
    }
    const user = await User.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!user) {
        return res.status(400).json({ error: "Invalid user" });
    }
    res.status(200).json(user);
};
exports.updateUser = updateUser;
const getUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user" });
    }
    const user = await User.findById({ _id: id });
    if (!user) {
        return res.status(400).json({ error: "Invalid user" });
    }
    res.status(200).json(user);
};
exports.getUser = getUser;
