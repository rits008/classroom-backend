import { Router } from "express";
import { validateSubmission } from "../../middleware/validate";
import asyncMiddleware from "../../middleware/async-wrapper";
import * as controllers from "./assignment.control";
import { isAuthorizedUser, isInstructor } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  validateSubmission,
  asyncMiddleware(controllers.addSubmission)
);

router.get(
  "/:assignmentId",
  isAuthorizedUser,
  isInstructor,
  asyncMiddleware(controllers.getSubmissions)
);

export default router;
