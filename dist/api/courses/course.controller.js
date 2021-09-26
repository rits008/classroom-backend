"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("../../services/course.service"));
async function getAllCourses(req, res) {
    const courses = await course_service_1.default.getAllCourses();
    res.json(courses);
}
async function getCourseByCode(req, res) {
    const course = await course_service_1.default.getCourseByCourseCode(req.params.courseCode);
    res.json(course);
}
exports.default = { getAllCourses, getCourseByCode };
