"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = __importDefault(require("../models/course.model"));
class CourseService {
    static async createCourse(body) {
        const { name, description, courseCode, instructor } = body;
        const course = new course_model_1.default({
            name,
            description,
            courseCode,
            instructor,
        });
        return course.save();
    }
    static async deleteCourse(courseCode) {
        return course_model_1.default.findOneAndDelete({ courseCode });
    }
    static async getCourseByCourseCode(courseCode) {
        return course_model_1.default.findOne({ courseCode }).populate("instructor", "_id name email");
    }
    static async getCourseById(id) {
        return course_model_1.default.findById(id).populate(["instructor", "students"]);
    }
    static async enrollStudent(courseCode, studentId) {
        return course_model_1.default.findOneAndUpdate({ courseCode }, { $push: { students: studentId } }, { new: true }).populate("students", "name");
    }
    static async getStudentsEnrolledInCourse(courseCode) {
        return course_model_1.default.findOne({ courseCode })
            .select("students -_id")
            .populate("students", "name email");
    }
    static async getAllCourses() {
        return course_model_1.default.find()
            .select(["name", "courseCode", "instructor", "students", "isApproved"])
            .populate("instructor", "name email")
            .populate("students", "name email");
    }
    static async getApprovedCourses() {
        return course_model_1.default.find({ isApproved: true })
            .select(["name", "courseCode", "instructor", "students"])
            .populate("instructor", "name email")
            .populate("students", "name email");
    }
    static async approveCourse(courseCode) {
        return course_model_1.default.findOneAndUpdate({ courseCode }, { $set: { isApproved: true } }, { new: true });
    }
    static async addAnnouncementToCourse(courseCode, announcement) {
        return course_model_1.default.findOneAndUpdate({ courseCode }, { $push: { announcements: announcement } }, { new: true });
    }
}
exports.default = CourseService;
