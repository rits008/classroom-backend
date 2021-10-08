import { Router } from "express";
import { isAuthorizedUser } from "../../middleware/auth";
import asyncMiddleware from "../../middleware/async-wrapper";
import {
  createStudent,
  getAllStudents,
  getStudentByEmail,
  getEnrolledCourses,
} from "./student.controller";

const router = Router();

router.get("/:email", isAuthorizedUser, asyncMiddleware(getStudentByEmail));

router.get("/all", asyncMiddleware(getAllStudents));

router.post("/", asyncMiddleware(createStudent));

router.get(
  "/enrolled_courses",
  isAuthorizedUser,
  asyncMiddleware(getEnrolledCourses)
);

export default router;
