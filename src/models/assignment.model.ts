import mongoose, { Schema } from "mongoose";

export interface AssignmentDocument extends mongoose.Document {
  date: Date;
  deadline: Date;
  description: string;
  pdf: string;
}

const AssingmentSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  deadline: { type: Date, required: true },
  pdf: { type: String },
  description: { type: String },
  submissions: [{ type: Schema.Types.ObjectId, ref: "submission" }],
});

const Assignment = mongoose.model<AssignmentDocument>(
  "assignment",
  AssingmentSchema
);

export default Assignment;
