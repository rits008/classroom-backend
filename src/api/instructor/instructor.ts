import { Router } from "express";
import { validateCourseDetails } from "../../middleware/validate";
import { isAuthorizedUser, isInstructor } from "../../middleware/auth";
import asyncMiddleware from "../../middleware/async-wrapper";
import controllers from "./instructor.controller";

export const router = Router();

router.post(
  "/create_course",
  isAuthorizedUser,
  isInstructor,
  validateCourseDetails,
  asyncMiddleware(controllers.createCourse)
);

router.post(
  "/create_assignment",
  asyncMiddleware(controllers.createAssignment)
);

router.post(
  "/create_announcement",
  asyncMiddleware(controllers.createAnnouncement)
);

export default router;
