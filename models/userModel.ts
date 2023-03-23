import mongoose from "mongoose";
const { Schema } = mongoose;

export type LoginType = {
  username: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};
export type RegisterType = LoginType & {
  nameOnBankAccount: string;
  accountNumber: string;
  sortCodeWithDashes: string;
  amount: string;
};
const userSchema = new Schema<RegisterType>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    nameOnBankAccount: { type: String, required: true },
    accountNumber: { type: String, required: true },
    sortCodeWithDashes: { type: String, required: true },
    amount: { type: String, required: true },
  },
  { timestamps: true }
);

export default userSchema;
