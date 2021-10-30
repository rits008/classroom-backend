import mongoose, { Schema } from "mongoose";

export interface AssignmentDocument extends mongoose.Document {
  date: Date;
  deadline: Date;
  descriptions: string;
  pdf: string;
}

const AssingmentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  deadline: { type: Date, required: true },
  descriptions: { type: String, required: true },
  pdf: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "course" },
  submissions: [{ type: Schema.Types.ObjectId, ref: "submission" }],
});

const Assignment = mongoose.model<AssignmentDocument>(
  "assignment",
  AssingmentSchema
);

export default Assignment;
