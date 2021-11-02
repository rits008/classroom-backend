import Course, { CourseDocument } from "../models/course.model";
import { mongo } from "mongoose";

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

  static async deleteCourse(
    courseCode: string
  ): Promise<CourseDocument | null> {
    return Course.findOneAndDelete({ courseCode });
  }

  static async getCourseByCourseCode(
    courseCode: string
  ): Promise<CourseDocument | null> {
    return Course.findOne({ courseCode }).populate(
      "instructor",
      "_id name email"
    );
  }

  static async getCourseById(id: any): Promise<CourseDocument | null> {
    return Course.findById(id).populate([
      "instructor",
      "students",
      { path: "announcements", options: { sort: { date: -1 } } },
      "assignment",
    ]);
  }

  static async enrollStudent(
    courseCode: string,
    studentId: string
  ): Promise<CourseDocument | null> {
    return Course.findOneAndUpdate(
      { courseCode },
      { $push: { students: studentId } },
      { new: true }
    ).populate("students", "name");
  }

  static async getStudentsEnrolledInCourse(courseCode: string): Promise<any> {
    return Course.findOne({ courseCode })
      .select("students -_id")
      .populate("students", "name email");
  }

  static async getAllCourses(): Promise<CourseDocument[]> {
    return Course.find()
      .select(["name", "courseCode", "instructor", "students", "isApproved"])
      .populate("instructor", "name email")
      .populate("students", "name email");
  }

  static async getApprovedCourses(): Promise<CourseDocument[]> {
    return Course.find({ isApproved: true })
      .select(["name", "courseCode", "instructor", "students"])
      .populate("instructor", "name email")
      .populate("students", "name email");
  }

  static async approveCourse(
    courseCode: string
  ): Promise<CourseDocument | null> {
    return Course.findOneAndUpdate(
      { courseCode },
      { $set: { isApproved: true } },
      { new: true }
    );
  }

  static async addAnnouncementToCourse(
    courseCode: string,
    announcement: string
  ): Promise<CourseDocument | null> {
    return Course.findOneAndUpdate(
      { courseCode },
      { $push: { announcements: announcement } },
      { new: true }
    );
  }

  static async addAssignmentToCourse(
    courseCode: string,
    assignment: string
  ): Promise<CourseDocument | null> {
    return Course.findOneAndUpdate(
      { courseCode },
      { $push: { assignments: assignment } },
      { new: true }
    );
  }
}
