"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const admin_service_1 = __importDefault(require("../../services/admin.service"));
const instructor_service_1 = __importDefault(require("../../services/instructor.service"));
const student_service_1 = __importDefault(require("../../services/student.service"));
async function login(req, res) {
    const { email, password } = req.body;
    if (!getUserIfPresent(email))
        throw new Error("user does not exist");
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        throw new Error("Invalid Credentials");
    const token = res.json({ user: user, status: "success" });
}
exports.login = login;
const getUserIfPresent = async (email) => {
    const user = await Promise.all([
        student_service_1.default.getStudentByEmail(email),
        instructor_service_1.default.getInstructorByEmail(email),
        admin_service_1.default.getAdminByEmail(email),
    ]);
    return user.find((user) => user != null);
};
async function register(req, res) {
    const { email, role } = req.body;
    if (!getUserIfPresent(email)) {
        return res
            .status(409)
            .send({ message: "Email already exists", status: "error" });
    }
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
    }
}
exports.register = register;
