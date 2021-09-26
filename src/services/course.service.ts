import Course, { CourseDocument } from "../models/course.model";

interface body {
  name: string;
  description: string;
  courseCode: string;
  instructor: string;
}

export default class CourseService {
  static async createCourse(body: body): Promise<CourseDocument> {
    const { name, description, courseCode, instructor } = body;

    const course = new Course({
      name,
      description,
      courseCode,
      instructor,
    });

    return course.save();
  }

  static async getCourseByCourseCode(
    courseCode: string
  ): Promise<CourseDocument | null> {
    return Course.findOne({ courseCode }).populate(
      "instructor",
      "_id name email"
    );
  }

  static async getAllCourses(): Promise<CourseDocument[]> {
    return Course.find().populate("instructor", "_id name email");
  }
}
