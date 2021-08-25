import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { StudentDocument } from "./student.model";

export interface InstructorDocument extends StudentDocument {
  isInstructor: boolean;
}

const InstructorSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isInstructor: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Instructor = mongoose.model<InstructorDocument>(
  "Instructor",
  InstructorSchema
);

InstructorSchema.pre<InstructorDocument>("save", async function (next) {
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

InstructorSchema.methods.comparePassword = async function (password: string) {
  const user = this as InstructorDocument;
  return await bcrypt.compare(password, user.password).catch((e) => false);
};

export default Instructor;
