import { Router } from "express";
import { validateCourseDetails } from "../../middleware/validate";
import { isAuthorizedUser, isInstructor } from "../../middleware/auth";
import asyncMiddleware from "../../middleware/async-wrapper";
import controllers from "./instructor.controller";

export const router = Router();

router.get("/all", asyncMiddleware(controllers.getAllInstructors));

router.get("/courses", asyncMiddleware(controllers.getCoursesByInstructor));

router.post(
  "/create_course",
  isAuthorizedUser,
  isInstructor,
  validateCourseDetails,
  asyncMiddleware(controllers.createCourse)
);

export default router;
