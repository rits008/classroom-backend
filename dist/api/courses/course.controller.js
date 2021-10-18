"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = exports.deleteCourse = exports.approveCourse = exports.enrollStudent = exports.getCourseByCode = exports.getAllCourses = void 0;
const course_service_1 = __importDefault(require("../../services/course.service"));
const student_service_1 = __importDefault(require("../../services/student.service"));
const ErrorHandler_1 = __importDefault(require("../../errors/ErrorHandler"));
const announcement_service_1 = __importDefault(require("../../services/announcement.service"));
async function getAllCourses(req, res) {
    const courses = await course_service_1.default.getAllCourses();
    res.json(courses);
}
exports.getAllCourses = getAllCourses;
async function getCourseByCode(req, res, next) {
    const course = await course_service_1.default.getCourseByCourseCode(req.params.courseCode);
    if (!course)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    res.json(course);
}
exports.getCourseByCode = getCourseByCode;
async function enrollStudent(req, res, next) {
    const courseCode = req.params.courseCode;
    const studentId = req.user._id;
    const doesCourseExist = await course_service_1.default.getCourseByCourseCode(req.params.courseCode);
    if (!doesCourseExist) {
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    }
    if (!doesCourseExist.isApproved) {
        return next(ErrorHandler_1.default.notAvailableYet("course is not approved yet"));
    }
    const studentEnrolledCourses = await course_service_1.default.getStudentsEnrolledInCourse(courseCode);
    if (studentEnrolledCourses === null || studentEnrolledCourses === void 0 ? void 0 : studentEnrolledCourses.find((student) => student._id === studentId)) {
        return next(ErrorHandler_1.default.userAlreadyExistsError("student already enrolled in course"));
    }
    const course = await course_service_1.default.enrollStudent(courseCode, studentId);
    await student_service_1.default.addCourseToStudent(studentId, course === null || course === void 0 ? void 0 : course._id);
    if (!course)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    res.json(course);
}
exports.enrollStudent = enrollStudent;
async function approveCourse(req, res, next) {
    const courseCode = req.body.courseCode;
    const doesCourseExist = await course_service_1.default.getCourseByCourseCode(courseCode);
    if (!doesCourseExist)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    const course = await course_service_1.default.approveCourse(courseCode);
    if (!course)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    res.json(course);
}
exports.approveCourse = approveCourse;
async function deleteCourse(req, res, next) {
    const courseCode = req.body.courseCode;
    const doesCourseExist = await course_service_1.default.getCourseByCourseCode(courseCode);
    if (!doesCourseExist)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    await course_service_1.default.deleteCourse(courseCode);
    res.json({ message: "course deleted successfully", status: "success" });
}
exports.deleteCourse = deleteCourse;
async function createAnnouncement(req, res, next) {
    const { text, courseCode } = req.body;
    const doesCourseExist = await course_service_1.default.getCourseByCourseCode(courseCode);
    if (!doesCourseExist) {
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    }
    console.log(req.body);
    res.end();
    const instructorId = req.user._id;
    const announcement = await announcement_service_1.default.createAnnouncement(text, instructorId);
    await course_service_1.default.addAnnouncementToCourse(courseCode, announcement._id);
    res.json({ message: "announcement created", status: "success" });
}
exports.createAnnouncement = createAnnouncement;
