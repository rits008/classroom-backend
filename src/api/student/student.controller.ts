import { Request, Response } from "express";
import StudentService from "../../services/student.service";

export const getAllStudents = async (req: Request, res: Response) => {
  const students = await StudentService.getAllStudents();
  res.status(200).json({ students });
};

export const getStudentByEmail = async (req: Request, res: Response) => {
  const user = await StudentService.getStudentByEmail(req.params.email);
  res.status(200).json({ user: user });
};

export const createStudent = async (req: Request, res: Response) => {
  const isExist = await StudentService.getStudentByEmail(req.body.email);
  if (isExist) throw new Error("User already exist");
  const user = await StudentService.createStudent(req.body);

  res.status(201).json({ user: user });
};

export const getEnrolledCourses = async (req, res: Response) => {
  const id = req.user._id;
  const courses = await StudentService.getStudentEnrolledCourses(id);
  res.status(200).json({ courses: courses });
};

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const user = await StudentService.getStudentByEmail(email);

//   if (!user) throw new Error("user does not exist");

//   const isMatch = await user.comparePassword(password);
//   if (!isMatch) throw new Error("Invalid Credentials");

//   const token = res.json({ user: user, status: "success" });
// };
