"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middleware/auth");
const async_wrapper_1 = __importDefault(require("../../middleware/async-wrapper"));
const student_controller_1 = require("./student.controller");
const router = express_1.Router();
router.get("/user/:email", auth_1.isAuthorizedUser, async_wrapper_1.default(student_controller_1.getStudentByEmail));
router.get("/all", async_wrapper_1.default(student_controller_1.getAllStudents));
router.post("/", async_wrapper_1.default(student_controller_1.createStudent));
router.get("/enrolled_courses", auth_1.isAuthorizedUser, async_wrapper_1.default(student_controller_1.getEnrolledCourses));
exports.default = router;
