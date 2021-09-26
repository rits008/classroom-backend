import Joi from "joi";
import CourseService from "../services/course.service";
import ErrorHandler from "../errors/ErrorHandler";

export function validateRegister(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
    role: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return next(ErrorHandler.badRequestError(result.error.details[0].message));
  }

  next();
}

export function validateLogin(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return next(ErrorHandler.badRequestError(result.error.details[0].message));
  }

  next();
}

export async function validateCourseDetails(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(255).required(),
    courseCode: Joi.string()
      .min(3)
      .max(5)
      .required()
      .pattern(/^[A-Z]{2}[0-9]{3}$/),
    instructor: Joi.string(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return next(ErrorHandler.badRequestError(result.error.details[0].message));
  }

  const course = await CourseService.getCourseByCourseCode(req.body.courseCode);

  if (course) {
    return next(
      ErrorHandler.badRequestError("Course already exists with that code")
    );
  }

  next();
}
