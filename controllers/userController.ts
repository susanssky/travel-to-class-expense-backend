import mongoose from "mongoose";
import { Request, Response } from "express";
import userSchema, { RegisterType } from "../models/userModel";
import bcrypt from "bcrypt";
const User = mongoose.model<RegisterType>("users", userSchema);

export const createUser = async (req: Request, res: Response) => {
  const {
    username,
    password,
    nameOnBankAccount,
    accountNumber,
    sortCodeWithDashes,
    amount,
  } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: `Username already exists` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create<RegisterType>({
      username,
      password: hashedPassword,
      nameOnBankAccount,
      accountNumber,
      sortCodeWithDashes,
      amount,
    });
    res.status(200).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid username" });
    }
    const isCorrectPW = await bcrypt.compare(password, findUser.password);
    if (!isCorrectPW) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const {
      password: _,
      createdAt,
      updatedAt,
      __v,
      ...rest
    } = findUser.toObject();
    // console.log(rest);
    res.status(200).json(rest);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user" });
  }
  const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!user) {
    return res.status(400).json({ error: "Invalid user" });
  }
  res.status(200).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid user" });
  }
  const user = await User.findById({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "Invalid user" });
  }
  res.status(200).json(user);
};
