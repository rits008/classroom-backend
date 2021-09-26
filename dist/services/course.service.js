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
    static async getCourseByCourseCode(courseCode) {
        return course_model_1.default.findOne({ courseCode }).populate("instructor", "_id name email");
    }
    static async getAllCourses() {
        return course_model_1.default.find().populate("instructor", "_id name email");
    }
}
exports.default = CourseService;
