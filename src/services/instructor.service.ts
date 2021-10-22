import Instructor, { InstructorDocument } from "../models/instructor.model";

type body = {
  email: string;
  password: string;
  name: string;
};

export default class InstructorService {
  static async getUser(email: string): Promise<InstructorDocument | null> {
    return Instructor.findOne({ email: email });
  }

  static async createInstructor(body: body): Promise<InstructorDocument> {
    const instructor = new Instructor({
      email: body.email,
      password: body.password,
      name: body.name,
      isInstructor: true,
    });

    return instructor.save();
  }

  static async getCoursesByInstructor(id: string) {
    return Instructor.findById(id).select(["courses"]).populate("courses").populate("instructor");
  }

  static async addCourseToInstructor(instructorId: string, courseId: string) {
    return Instructor.findByIdAndUpdate(
      instructorId,
      {
        $push: { courses: courseId },
      },
      {
        new: true,
      }
    );
  }

  static async getInstructorById(
    id: string
  ): Promise<InstructorDocument | null> {
    return Instructor.findById(id);
  }

  static async getAllInstructors(): Promise<InstructorDocument[]> {
    return Instructor.find();
  }

  static async getInstructorByEmail(
    email: string
  ): Promise<InstructorDocument | null> {
    return Instructor.findOne({ email }).select([
      "-__v",
      "-createdAt",
      "-updatedAt",
    ]);
  }
}
