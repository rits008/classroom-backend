import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../config";
import { CourseDocument } from "./course.model";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  imageUrl: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface StudentDocument extends UserDocument {
  courses: CourseDocument[];
  isVerified: boolean;
}

const StudentSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    imageUrl: {
      type: String,
      default: config.defaultImageUrl,
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "course" }],
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
  return await bcrypt.compare(password, user.password).catch(() => false);
};

const Student = mongoose.model<StudentDocument>("student", StudentSchema);

export default Student;
