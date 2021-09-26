"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_service_1 = __importDefault(require("../../services/course.service"));
async function createCourse(req, res) {
    const course = await course_service_1.default.createCourse(req.body);
    res.json(course);
}
async function createAssignment(_req, res) {
    res.send("createAssignment");
}
async function createAnnouncement(_req, res) {
    res.send("createAnnouncement");
}
exports.default = { createCourse, createAnnouncement, createAssignment };
