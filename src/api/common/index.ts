import { Request, Response, NextFunction } from "express";
import AdminService from "../../services/admin.service";
import log from "../../logger";
import InstructorService from "../../services/instructor.service";
import StudentService from "../../services/student.service";
import ErrorHandler from "../../errors/ErrorHandler";
import { createToken } from "../../token";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  const user = await getUserIfPresent(email);

  if (!user) return next(ErrorHandler.notFoundError("user not found"));

  console.log(user);

  const isMatch = await user.comparePassword(password);

  if (!isMatch) return next(ErrorHandler.badRequestError());

  const token = createToken(user._id);

  res.json({
    user: removeProperty(user, "password"),
    status: "success",
    accessToken: token,
  });
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, role } = req.body;

  log.info(`registering ${role} with email ${email}`);

  const user = await getUserIfPresent(email);

  if (user)
    return next(ErrorHandler.userAlreadyExistsError("user already exists"));

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

    default:
      return next(ErrorHandler.badRequestError("invalid role"));
  }
}

async function getUserIfPresent(email: string) {
  const user = await Promise.all([
    StudentService.getStudentByEmail(email),
    InstructorService.getInstructorByEmail(email),
    AdminService.getAdminByEmail(email),
  ]);

  return user.find((user) => user != null);
}

function removeProperty(obj: any, property: string) {
  obj[property] = undefined;
  return obj;
}

export async function getUserById(id: string) {
  const users = await Promise.all([
    StudentService.getStudentById(id),
    InstructorService.getInstructorById(id),
    AdminService.getAdminById(id),
  ]);
  return users.find((user) => user != null);
}
