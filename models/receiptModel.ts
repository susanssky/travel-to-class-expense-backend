import mongoose from "mongoose";
const { Schema } = mongoose;

export type ReceiptType = {
  imgOriginalName: string;
  format: string;
  imgCloudinaryBaseName: string;
  public_id: string;
  url: string;
  status: string;
  username: string;
  nameOnBankAccount: string;
  accountNumber: string;
  sortCodeWithDashes: string;
  amount: string;
};
const receiptSchema = new Schema<ReceiptType>(
  {
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
  },
  { timestamps: true }
);

export default receiptSchema;
