"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = exports.getStudentByEmail = exports.getAllStudents = void 0;
const student_service_1 = __importDefault(require("../../services/student.service"));
const getAllStudents = async (req, res) => {
    const students = await student_service_1.default.getAllStudents();
    res.status(200).json({ students });
};
exports.getAllStudents = getAllStudents;
const getStudentByEmail = async (req, res) => {
    const user = await student_service_1.default.getStudentByEmail(req.params.email);
    res.status(200).json({ user: user });
};
exports.getStudentByEmail = getStudentByEmail;
const createStudent = async (req, res) => {
    const isExist = await student_service_1.default.getStudentByEmail(req.body.email);
    if (isExist)
        throw new Error("User already exist");
    const user = await student_service_1.default.createStudent(req.body);
    res.status(201).json({ user: user });
};
exports.createStudent = createStudent;