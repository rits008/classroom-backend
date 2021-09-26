"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const async_wrapper_1 = __importDefault(require("../../middleware/async-wrapper"));
const course_controller_1 = __importDefault(require("./course.controller"));
const router = express_1.Router();
router.get("/all", async_wrapper_1.default(course_controller_1.default.getAllCourses));
router.get("/:code", async_wrapper_1.default(course_controller_1.default.getCourseByCode));
exports.default = router;
