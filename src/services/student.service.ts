import Student, { StudentDocument } from "../models/student.model";

type body = {
  email: string;
  password: string;
  name: string;
};

export default class StudentService {
  static async createStudent(body: body): Promise<StudentDocument> {
    const student = new Student({
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return student.save();
  }

  static async addCourseToStudent(id: string, courseId: string): Promise<any> {
    return Student.findByIdAndUpdate(id, {
      $push: { courses: courseId },
    });
  }

  static async getStudentById(id: string): Promise<StudentDocument | null> {
    return Student.findById(id);
  }

  static async getAllStudents(): Promise<StudentDocument[]> {
    return Student.find();
  }

  static async getStudentByEmail(
    email: string
  ): Promise<StudentDocument | null> {
    return Student.findOne({ email }).select([
      "-__v",
      "-createdAt",
      "-updatedAt",
    ]);
  }

  static async getStudentEnrolledCourses(id: string): Promise<any> {
    return Student.findById(id).populate("courses");
  }
}
