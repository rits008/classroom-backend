"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssignment = exports.createAnnouncement = exports.deleteCourse = exports.approveCourse = exports.enrollStudent = exports.getCourseById = exports.getApprovedCourses = exports.getAllCourses = void 0;
const course_service_1 = __importDefault(require("../../services/course.service"));
const student_service_1 = __importDefault(require("../../services/student.service"));
const ErrorHandler_1 = __importDefault(require("../../errors/ErrorHandler"));
const announcement_service_1 = __importDefault(require("../../services/announcement.service"));
const assignment_service_1 = __importDefault(require("../../services/assignment.service"));
async function getAllCourses(req, res) {
    const courses = await course_service_1.default.getAllCourses();
    res.json(courses);
}
exports.getAllCourses = getAllCourses;
async function getApprovedCourses(req, res) {
    const courses = await course_service_1.default.getApprovedCourses();
    res.json(courses);
}
exports.getApprovedCourses = getApprovedCourses;
async function getCourseById(req, res, next) {
    if (!req.params.id)
        return next(ErrorHandler_1.default.badRequestError("Course id is required"));
    const course = await course_service_1.default.getCourseById(req.params.id);
    if (!course)
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    res.json(course);
}
exports.getCourseById = getCourseById;
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
    const { students } = await course_service_1.default.getStudentsEnrolledInCourse(courseCode);
    if (students === null || students === void 0 ? void 0 : students.find((student) => student._id === studentId)) {
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
    const instructorId = req.user._id;
    const announcement = await announcement_service_1.default.createAnnouncement(text, instructorId);
    await course_service_1.default.addAnnouncementToCourse(courseCode, announcement._id);
    res.json({ message: "announcement created", status: "success" });
}
exports.createAnnouncement = createAnnouncement;
async function createAssignment(req, res, next) {
    const _a = req.body, { courseCode } = _a, assignment = __rest(_a, ["courseCode"]);
    const doesCourseExist = await course_service_1.default.getCourseByCourseCode(courseCode);
    if (!doesCourseExist) {
        return next(ErrorHandler_1.default.notFoundError("course does not exist"));
    }
    const createdAssignment = await assignment_service_1.default.createAssignment(assignment);
    await course_service_1.default.addAssignmentToCourse(courseCode, createdAssignment._id);
    res.json({ message: "assignment created", status: "success" });
}
exports.createAssignment = createAssignment;
