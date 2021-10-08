"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student.model"));
class StudentService {
    static async createStudent(body) {
        const student = new student_model_1.default({
            email: body.email,
            password: body.password,
            name: body.name,
        });
        return student.save();
    }
    static async addCourseToStudent(id, courseId) {
        return student_model_1.default.findByIdAndUpdate(id, {
            $push: { courses: courseId },
        });
    }
    static async getStudentById(id) {
        return student_model_1.default.findById(id);
    }
    static async getAllStudents() {
        return student_model_1.default.find();
    }
    static async getStudentByEmail(email) {
        return student_model_1.default.findOne({ email })
            .select(["-__v", "-createdAt", "-updatedAt"])
            .populate("courses");
    }
    static async getStudentEnrolledCourses(id) {
        return student_model_1.default.findById(id);
    }
}
exports.default = StudentService;
