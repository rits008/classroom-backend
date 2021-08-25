"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    constructor(status, msg) {
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
exports.default = ErrorHandler;
