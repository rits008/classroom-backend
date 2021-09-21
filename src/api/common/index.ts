import { Request, Response } from "express";
import AdminService from "../../services/admin.service";
import InstructorService from "../../services/instructor.service";
import StudentService from "../../services/student.service";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await getUserIfPresent(email);

  if (!user) throw new Error("user does not exist");

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw new Error("Invalid Credentials");

  const token = res.json({ user: user, status: "success" });
}

const getUserIfPresent = async (email: string) => {
  const user = await Promise.all([
    StudentService.getStudentByEmail(email),
    InstructorService.getInstructorByEmail(email),
    AdminService.getAdminByEmail(email),
  ]);

  return user.find((user) => user != null);
};

export async function register(req: Request, res: Response) {
  const { email, role } = req.body;

  if (!getUserIfPresent(email)) {
    return res
      .status(409)
      .send({ message: "Email already exists", status: "error" });
  }

  switch (role) {
    case "student": {
      const student = await StudentService.createStudent(req.body);
      return res.status(201).json({
        user: student,
        message: "Student created successfully",
        status: "success",
      });
    }

    case "instructor": {
      const instructor = await InstructorService.createInstructor(req.body);
      return res.status(201).json({
        user: instructor,
        message: "Instructor created successfully",
        status: "success",
      });
    }

    case "admin": {
      const admin = await AdminService.createAdmin(req.body);
      return res.status(201).json({
        user: admin,
        message: "Admin created successfully",
        status: "success",
      });
    }
  }
}
