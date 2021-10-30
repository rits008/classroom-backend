"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instructor_model_1 = __importDefault(require("../models/instructor.model"));
class InstructorService {
    static async getUser(email) {
        return instructor_model_1.default.findOne({ email: email });
    }
    static async createInstructor(body) {
        const instructor = new instructor_model_1.default({
            email: body.email,
            password: body.password,
            name: body.name,
            isInstructor: true,
        });
        return instructor.save();
    }
    static async getCoursesByInstructor(id) {
        return instructor_model_1.default.findById(id)
            .populate({
            path: "courses",
            populate: {
                path: "instructor",
            },
        });
    }
    static async addCourseToInstructor(instructorId, courseId) {
        return instructor_model_1.default.findByIdAndUpdate(instructorId, {
            $push: { courses: courseId },
        }, {
            new: true,
        });
    }
    static async getInstructorById(id) {
        return instructor_model_1.default.findById(id);
    }
    static async getAllInstructors() {
        return instructor_model_1.default.find();
    }
    static async getInstructorByEmail(email) {
        return instructor_model_1.default.findOne({ email }).select([
            "-__v",
            "-createdAt",
            "-updatedAt",
        ]);
    }
}
exports.default = InstructorService;
