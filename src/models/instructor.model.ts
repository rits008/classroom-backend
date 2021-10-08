import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { UserDocument } from "./student.model";

export interface InstructorDocument extends UserDocument {
  isInstructor: boolean;
}

const InstructorSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: {
      type: String,
      default: config.defaultImageUrl,
    },
    isInstructor: { type: Boolean, default: true },
  },
  { timestamps: true }
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

const Instructor = mongoose.model<InstructorDocument>(
  "instructor",
  InstructorSchema
);

export default Instructor;
