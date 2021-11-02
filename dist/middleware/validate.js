"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSubmission = exports.validateAssignment = exports.validateAnnouncement = exports.validateCourseDetails = exports.validateLogin = exports.validateRegister = void 0;
const joi_1 = __importDefault(require("joi"));
const course_service_1 = __importDefault(require("../services/course.service"));
const ErrorHandler_1 = __importDefault(require("../errors/ErrorHandler"));
function validateRegister(req, res, next) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(3).max(255).required(),
        role: joi_1.default.string(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    next();
}
exports.validateRegister = validateRegister;
async function validateLogin(req, res, next) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(3).max(255).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    console.log("reached here");
    next();
}
exports.validateLogin = validateLogin;
async function validateCourseDetails(req, res, next) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(3).max(30).required(),
        description: joi_1.default.string().min(3).max(255).required(),
        courseCode: joi_1.default.string()
            .min(3)
            .max(5)
            .required()
            .pattern(/^[A-Z]{2}[0-9]{3}$/),
        instructor: joi_1.default.string(),
        id: joi_1.default.any(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    const course = await course_service_1.default.getCourseByCourseCode(req.body.courseCode);
    if (course) {
        return next(ErrorHandler_1.default.badRequestError("Course already exists with that code"));
    }
    next();
}
exports.validateCourseDetails = validateCourseDetails;
async function validateAnnouncement(req, res, next) {
    console.log(req.body);
    const schema = joi_1.default.object({
        text: joi_1.default.string().min(3).max(255).required(),
        courseCode: joi_1.default.string().min(5).max(255).required(),
        id: joi_1.default.any(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    next();
}
exports.validateAnnouncement = validateAnnouncement;
async function validateAssignment(req, res, next) {
    const schema = joi_1.default.object({
        description: joi_1.default.string().min(3).max(255).required(),
        courseCode: joi_1.default.string().min(5).max(255).required(),
        pdf: joi_1.default.any(),
        deadline: joi_1.default.date().required(),
        id: joi_1.default.any(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    next();
}
exports.validateAssignment = validateAssignment;
function validateSubmission(req, res, next) {
    const schema = joi_1.default.object({
        assignmentId: joi_1.default.string().required(),
        studentId: joi_1.default.string().required(),
        pdf: joi_1.default.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(ErrorHandler_1.default.badRequestError(result.error.details[0].message));
    }
    next();
}
exports.validateSubmission = validateSubmission;
