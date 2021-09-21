import Student, { StudentDocument } from "../models/student.model";

type body = {
  email: string;
  password: string;
  name: string;
};

export default class StudentService {
  static async getUser(email: string): Promise<StudentDocument | null> {
    return Student.findOne({ email: email });
  }

  static async createStudent(body: body): Promise<StudentDocument> {
    const student = new Student({
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return student.save();
  }

  static async getAllStudents(): Promise<StudentDocument[]> {
    return Student.find();
  }

  static async getStudentByEmail(
    email: string
  ): Promise<StudentDocument | null> {
    return Student.findOne({ email: email });
  }
}
