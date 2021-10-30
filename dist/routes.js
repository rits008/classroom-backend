"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./api/common");
const student_1 = __importDefault(require("./api/student/student"));
const instructor_1 = __importDefault(require("./api/instructor/instructor"));
const course_1 = __importDefault(require("./api/courses/course"));
const ErrorHandler_1 = __importDefault(require("./errors/ErrorHandler"));
const auth_1 = require("./middleware/auth");
const async_wrapper_1 = __importDefault(require("./middleware/async-wrapper"));
const validate_1 = require("./middleware/validate");
const logger_1 = __importDefault(require("./logger"));
function default_1(app) {
    app.get("/", (req, res) => {
        res.send("Welcome to classroom backend");
    });
    app.post("/login", validate_1.validateLogin, async_wrapper_1.default(common_1.login));
    app.post("/register", validate_1.validateRegister, auth_1.isAdmin, async_wrapper_1.default(common_1.register));
    app.use("/student", student_1.default);
    app.use("/course", course_1.default);
    app.use("/instructor", instructor_1.default);
    app.use((req, res) => {
        res.status(404).send("Not found");
    });
    app.use((err, req, res, next) => {
        console.log(err);
        if (err instanceof ErrorHandler_1.default) {
            logger_1.default.error({ error: err });
            return res.status(err.status).json({ message: err.msg, status: "error" });
        }
        logger_1.default.error({ error: err });
        res.status(500).json({ msg: "Internal server error", status: "error" });
    });
}
exports.default = default_1;
