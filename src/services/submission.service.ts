import Submission, { SubmissionDocument } from "../models/submission.model";

interface data {
  studentId: string;
  assignmentId: string;
  pdf: string;
}

export default class SubmissionService {
  static async createSubmission(data: data): Promise<SubmissionDocument> {
    const submission = { ...data, date: new Date() };
    return Submission.create(submission);
  }
}
