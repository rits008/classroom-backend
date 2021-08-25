import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { StudentDocument } from "./student.model";

export interface AdminDocument extends StudentDocument {
  isAdmin: boolean;
}

const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

AdminSchema.pre<AdminDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, config.saltRounds);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

AdminSchema.methods.comparePassword = async function (password: string) {
  const user = this as AdminDocument;
  return await bcrypt.compare(password, user.password).catch((e) => false);
};

export default Admin;
