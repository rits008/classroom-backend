import mongoose from "mongoose";
import { AssignmentDocument } from "./assignment.model";
import { StudentDocument } from "./student.model";

export interface SubmissionDocument extends mongoose.Document {
  studentId: StudentDocument;
  assignmentId: AssignmentDocument;
  submissionDate: Date;
  pdf: string;
}

const submissionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "assignment" },
  submissionDate: { type: Date, default: Date.now },
  pdf: { type: String, required: true },
});

const Submission = mongoose.model<SubmissionDocument>(
  "submission",
  submissionSchema
);

export default Submission;
