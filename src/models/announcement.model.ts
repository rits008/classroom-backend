import mongoose, { Schema } from "mongoose";
import { InstructorDocument } from "./instructor.model";

export interface AnnouncementDocument extends mongoose.Document {
  text: string;
  date: Date;
  instructor: InstructorDocument;
}

const AnnouncementSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  instructor: { type: Schema.Types.ObjectId, ref: "instructor" },
});

const Announcement = mongoose.model<AnnouncementDocument>(
  "announcement",
  AnnouncementSchema
);

export default Announcement;
