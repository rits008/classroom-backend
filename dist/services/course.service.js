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
        return course_model_1.default.findOne({ courseCode })
            .select("instructor")
            .populate("instructor", "_id name email");
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
            .populate("instructor", "name email imageUrl")
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
    static async getCourseById(id) {
        return course_model_1.default.findById(id).populate([
            "instructor",
            "students",
            { path: "announcements", options: { sort: { date: -1 } } },
            {
                path: "assignments",
                options: {
                    sort: { date: -1 },
                    populate: {
                        path: "submissions",
                        options: {
                            sort: { submissionDate: 1 },
                            select: ["studentId"],
                        },
                    },
                },
            },
            "assignment",
        ]);
    }
    static async addAnnouncementToCourse(courseCode, announcement) {
        return course_model_1.default.findOneAndUpdate({ courseCode }, { $push: { announcements: announcement } }, { new: true });
    }
    static async addAssignmentToCourse(courseCode, assignment) {
        return course_model_1.default.findOneAndUpdate({ courseCode }, { $push: { assignments: assignment } }, { new: true });
    }
    static async checkIfStudentIsEnrolled(studentId, courseCode) {
        const course = await course_model_1.default.findOne({ courseCode }).populate("students");
        if (!course) {
            return false;
        }
        const enrolled = course.students.find((student) => student.id === studentId);
        return enrolled ? true : false;
    }
    static async checkIfAssignmentIsInCourse(courseCode, assignmentId) {
        const course = await course_model_1.default.findOne({ courseCode }).populate("assignments");
        if (!course) {
            return false;
        }
        const enrolled = course.assignments.find((assignment) => assignment.id === assignmentId);
        return enrolled ? true : false;
    }
}
exports.default = CourseService;
