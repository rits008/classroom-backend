import CourseService from "../../services/course.service";
import studentService from "../../services/student.service";
import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../middleware/auth";
import ErrorHandler from "../../errors/ErrorHandler";
import AnnouncementService from "../../services/announcement.service";
import AssignmentService from "../../services/assignment.service";

export async function getAllCourses(req: Request, res: Response) {
  const courses = await CourseService.getAllCourses();

  res.json(courses);
}

export async function getApprovedCourses(req: Request, res: Response) {
  const courses = await CourseService.getApprovedCourses();
  res.json(courses);
}

export async function getCourseById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.params.id)
    return next(ErrorHandler.badRequestError("Course id is required"));

  const course = await CourseService.getCourseById(req.params.id);

  if (!course) return next(ErrorHandler.notFoundError("course does not exist"));

  res.json(course);
}

export async function enrollStudent(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const courseCode = req.params.courseCode;
  const studentId = req.user._id;

  const doesCourseExist = await CourseService.getCourseByCourseCode(
    req.params.courseCode
  );

  if (!doesCourseExist) {
    return next(ErrorHandler.notFoundError("course does not exist"));
  }

  if (!doesCourseExist.isApproved) {
    return next(ErrorHandler.notAvailableYet("course is not approved yet"));
  }

  const { students } = await CourseService.getStudentsEnrolledInCourse(
    courseCode
  );

  if (students?.find((student) => student._id === studentId)) {
    return next(
      ErrorHandler.userAlreadyExistsError("student already enrolled in course")
    );
  }

  const course = await CourseService.enrollStudent(courseCode, studentId);
  await studentService.addCourseToStudent(studentId, course?._id);
  if (!course) return next(ErrorHandler.notFoundError("course does not exist"));
  res.json(course);
}

export async function approveCourse(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const courseCode = req.body.courseCode;

  const doesCourseExist = await CourseService.getCourseByCourseCode(courseCode);

  if (!doesCourseExist)
    return next(ErrorHandler.notFoundError("course does not exist"));

  const course = await CourseService.approveCourse(courseCode);
  if (!course) return next(ErrorHandler.notFoundError("course does not exist"));
  res.json(course);
}

export async function deleteCourse(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const courseCode = req.body.courseCode;

  const doesCourseExist = await CourseService.getCourseByCourseCode(courseCode);

  if (!doesCourseExist)
    return next(ErrorHandler.notFoundError("course does not exist"));

  await CourseService.deleteCourse(courseCode);
  res.json({ message: "course deleted successfully", status: "success" });
}

export async function createAnnouncement(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { text, courseCode } = req.body;

  const doesCourseExist = await CourseService.getCourseByCourseCode(courseCode);

  if (!doesCourseExist) {
    return next(ErrorHandler.notFoundError("course does not exist"));
  }

  const instructorId = req.user._id;
  const announcement = await AnnouncementService.createAnnouncement(
    text,
    instructorId
  );

  await CourseService.addAnnouncementToCourse(courseCode, announcement._id);

  res.json({ message: "announcement created", status: "success" });
}

export async function createAssignment(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const { courseCode, ...assignment } = req.body;

  const doesCourseExist = await CourseService.getCourseByCourseCode(courseCode);

  if (!doesCourseExist) {
    return next(ErrorHandler.notFoundError("course does not exist"));
  }

  const createdAssignment = await AssignmentService.createAssignment(
    assignment
  );

  await CourseService.addAssignmentToCourse(courseCode, createdAssignment._id);

  res.json({ message: "assignment created", status: "success" });
}
