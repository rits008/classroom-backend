import { Router } from "express";
import { isAdmin, isAuthorizedUser, isInstructor } from "../../middleware/auth";
import asyncMiddleware from "../../middleware/async-wrapper";
import * as controllers from "./course.controller";
import { validateAnnouncement } from "../../middleware/validate";

const router = Router();

router.get("/all", asyncMiddleware(controllers.getAllCourses));

router.get("/:courseCode", asyncMiddleware(controllers.getCourseByCode));

router.post("/approve", isAdmin, asyncMiddleware(controllers.approveCourse));

router.post("/delete", isAdmin, asyncMiddleware(controllers.deleteCourse));

router.post(
  "/create_announcement",
  isAuthorizedUser,
  isInstructor,
  validateAnnouncement,
  asyncMiddleware(controllers.createAnnouncement)
);

router.post(
  "/enroll/:courseCode",
  isAuthorizedUser,
  asyncMiddleware(controllers.enrollStudent)
);

export default router;
