import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import log from "../logger";

export interface StudentDocument extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const StudentSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

StudentSchema.pre<StudentDocument>("save", async function (next) {
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

StudentSchema.methods.comparePassword = async function (password: string) {
  const user = this as StudentDocument;
  return await bcrypt.compare(password, user.password).catch((e) => false);
};

const Student = mongoose.model<StudentDocument>("student", StudentSchema);

export default Student;
