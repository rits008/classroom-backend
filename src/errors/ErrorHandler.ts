export default class ErrorHandler {
  msg: string;
  status: number;
  constructor(status: number, msg: string) {
    this.status = status;
    this.msg = msg;
  }

  static valdationError(message = "All fields are required") {
    return new ErrorHandler(422, message);
  }

  static notFoundError(message = "ItemNotFound") {
    return new ErrorHandler(404, message);
  }
}
