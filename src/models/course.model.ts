import mongoose, { Schema } from "mongoose";
import { AnnouncementDocument } from "./announcement.model";
import { AssignmentDocument } from "./assignment.model";
import { InstructorDocument } from "./instructor.model";
import { StudentDocument } from "./student.model";

export interface CourseDocument extends mongoose.Document {
  name: string;
  description: string;
  courseCode: string;
  isApproved: boolean;
  instrutor: InstructorDocument[];
  students: StudentDocument[];
  assignments: AssignmentDocument[];
  announcements: AnnouncementDocument[];
}

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    courseCode: { type: String, required: true, unique: true },
    isApproved: { type: Boolean, default: false },
    instructor: [
      { type: Schema.Types.ObjectId, ref: "instructor", required: true },
    ],
    students: [{ type: Schema.Types.ObjectId, ref: "student" }],
    assignments: [{ type: Schema.Types.ObjectId, ref: "assignment" }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "announcement" }],
  },
  {
    timestamps: true,
  }
);

CourseSchema.pre<CourseDocument>("save", function (next) {
  this.courseCode = this.courseCode.toUpperCase();
  next();
});
const Course = mongoose.model<CourseDocument>("course", CourseSchema);

export default Course;

//
