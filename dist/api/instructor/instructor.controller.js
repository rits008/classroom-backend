"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const instructor_service_1 = __importDefault(require("../../services/instructor.service"));
const course_service_1 = __importDefault(require("../../services/course.service"));
async function createCourse(req, res) {
    const course = await course_service_1.default.createCourse(req.body);
    await instructor_service_1.default.addCourseToInstructor(req.body.id, course._id);
    res.json(course);
}
async function createAssignment(req, res) {
    res.send("createAssignment");
}
async function createAnnouncement(req, res) {
    res.send("createAnnouncement");
}
exports.default = { createCourse, createAnnouncement, createAssignment };
