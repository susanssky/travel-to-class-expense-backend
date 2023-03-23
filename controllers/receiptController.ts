import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import receiptSchema, { ReceiptType } from "../models/receiptModel";
const Receipt = mongoose.model<ReceiptType>("receipts", receiptSchema);

export const getAllRecipts = async (req: Request, res: Response) => {
  const receipts = await Receipt.find({}).sort({ createdAt: -1 });
  res.status(200).json(receipts);
};
export const uploadRecipt = async (req: Request, res: Response) => {
  try {
    const {
      secure_url,
      original_filename,
      public_id,
      username,
      nameOnBankAccount,
      accountNumber,
      sortCodeWithDashes,
      amount,
      format,
    } = req.body;
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload image" });
  }
};
export const getRecipt = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid recipt" });
  }
  const receipt = await Receipt.findById({ _id: id });
  if (!receipt) {
    return res.status(400).json({ error: "Invalid receipt" });
  }
  res.status(200).json(receipt);
};

export const getReciptsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const receipts = await Receipt.find({ username }).sort({ createdAt: -1 });
  res.status(200).json(receipts);
};

export const updateRecipt = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid recipt" });
  }
  const receipt = await Receipt.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!receipt) {
    return res.status(400).json({ error: "Invalid receipt" });
  }
  res.status(200).json(receipt);
};

export const deleteRecipt = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { public_id } = req.body;

  const deletionResult = await cloudinary.uploader.destroy(public_id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Can't find this receipt" });
  }
  const receipts = await Receipt.findOneAndDelete({ _id: id });
  res.status(200).json(receipts);
};
