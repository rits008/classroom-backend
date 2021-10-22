"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const validate_1 = require("../../middleware/validate");
const auth_1 = require("../../middleware/auth");
const async_wrapper_1 = __importDefault(require("../../middleware/async-wrapper"));
const instructor_controller_1 = __importDefault(require("./instructor.controller"));
exports.router = express_1.Router();
exports.router.get("/", async_wrapper_1.default(instructor_controller_1.default.getAllInstructors));
exports.router.post("/create_course", auth_1.isAuthorizedUser, auth_1.isInstructor, validate_1.validateCourseDetails, async_wrapper_1.default(instructor_controller_1.default.createCourse));
exports.default = exports.router;
