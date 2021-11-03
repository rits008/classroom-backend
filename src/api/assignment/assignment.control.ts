import { NextFunction, Request, Response } from "express";
import SubmissionService from "../../services/submission.service";
import ErrorHandler from "../../errors/ErrorHandler";
import { RequestWithUser } from "../../middleware/auth";
import AssignmentService from "../../services/assignment.service";
import CourseService from "../../services/course.service";

export async function addSubmission(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { assignmentId, studentId, pdf, courseCode } = req.body;

  const isEnrolled = await CourseService.checkIfStudentIsEnrolled(
    studentId,
    courseCode
  );

  if (!isEnrolled)
    return next(
      ErrorHandler.notFoundError("student is not enrolled in course")
    );

  const doesAssignmentExist = await AssignmentService.getAssignmentById(
    assignmentId
  );

  if (!doesAssignmentExist)
    return next(ErrorHandler.notFoundError("assignment does not exist"));

  if (!doesAssignmentExist) {
    return next(ErrorHandler.notFoundError("assignment does not exist"));
  }

  const createdSubmission = await SubmissionService.createSubmission({
    assignmentId,
    pdf,
    studentId,
  });

  await AssignmentService.addSubmissionToAssignment(
    assignmentId,
    createdSubmission._id
  );

  res.json({ message: "submission created", status: "success" });
}

export async function getSubmissions(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { assignmentId } = req.params;
  const submissions = await AssignmentService.getAssignmentById(assignmentId);

  if (!submissions)
    return next(ErrorHandler.notFoundError("assignment does not exist"));

  return res.json(submissions);
}
