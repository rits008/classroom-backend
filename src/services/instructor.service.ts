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

  static async getAllInstructors(): Promise<InstructorDocument[]> {
    return Instructor.find();
  }

  static async getInstructorByEmail(
    email: string
  ): Promise<InstructorDocument | null> {
    return Instructor.findOne({ email: email });
  }
}
