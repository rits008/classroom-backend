"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.register = exports.login = void 0;
const admin_service_1 = __importDefault(require("../../services/admin.service"));
const logger_1 = __importDefault(require("../../logger"));
const instructor_service_1 = __importDefault(require("../../services/instructor.service"));
const student_service_1 = __importDefault(require("../../services/student.service"));
const ErrorHandler_1 = __importDefault(require("../../errors/ErrorHandler"));
const token_1 = require("../../token");
async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await getUserIfPresent(email);
    if (!user)
        return next(ErrorHandler_1.default.notFoundError("user not found"));
    console.log(user);
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return next(ErrorHandler_1.default.badRequestError());
    const token = token_1.createToken(user._id);
    res.json({
        user: removeProperty(user, "password"),
        status: "success",
        accessToken: token,
    });
}
exports.login = login;
async function register(req, res, next) {
    const { email, role } = req.body;
    logger_1.default.info(`registering ${role} with email ${email}`);
    const user = await getUserIfPresent(email);
    if (user)
        return next(ErrorHandler_1.default.userAlreadyExistsError("user already exists"));
    switch (role) {
        case "student": {
            const student = await student_service_1.default.createStudent(req.body);
            return res.status(201).json({
                user: student,
                message: "Student created successfully",
                status: "success",
            });
        }
        case "instructor": {
            const instructor = await instructor_service_1.default.createInstructor(req.body);
            return res.status(201).json({
                user: instructor,
                message: "Instructor created successfully",
                status: "success",
            });
        }
        case "admin": {
            const admin = await admin_service_1.default.createAdmin(req.body);
            return res.status(201).json({
                user: admin,
                message: "Admin created successfully",
                status: "success",
            });
        }
        default:
            return next(ErrorHandler_1.default.badRequestError("invalid role"));
    }
}
exports.register = register;
async function getUserIfPresent(email) {
    const user = await Promise.all([
        student_service_1.default.getStudentByEmail(email),
        instructor_service_1.default.getInstructorByEmail(email),
        admin_service_1.default.getAdminByEmail(email),
    ]);
    return user.find((user) => user != null);
}
function removeProperty(obj, property) {
    obj[property] = undefined;
    return obj;
}
async function getUserById(id) {
    const users = await Promise.all([
        student_service_1.default.getStudentById(id),
        instructor_service_1.default.getInstructorById(id),
        admin_service_1.default.getAdminById(id),
    ]);
    return users.find((user) => user != null);
}
exports.getUserById = getUserById;
