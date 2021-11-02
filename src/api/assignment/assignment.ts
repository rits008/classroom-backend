import { Router } from "express";
import { validateAssignment } from "../../middleware/validate";
import asyncMiddleware from "../../middleware/async-wrapper";
import * as controllers from "./assignment.control";

const router = Router();

router.post(
  "/",
  validateAssignment,
  asyncMiddleware(controllers.addSubmission)
);

export default router;
