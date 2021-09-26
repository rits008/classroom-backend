import mongoose, { Schema } from "mongoose";
import { CourseDocument } from "./course.model";

export interface AnnouncementDocument extends mongoose.Document {
  text: string;
  date: Date;
  course: CourseDocument;
}

const AnnouncementSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  course: { type: Schema.Types.ObjectId, ref: "course" },
});

const Announcement = mongoose.model<AnnouncementDocument>(
  "announcement",
  AnnouncementSchema
);

export default Announcement;
