"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./api/common");
const student_1 = __importDefault(require("./api/student/student"));
const logger_1 = __importDefault(require("./logger"));
const async_wrapper_1 = __importDefault(require("./middleware/async-wrapper"));
function default_1(app) {
    app.post("/login", async_wrapper_1.default(common_1.login));
    app.post("/register", async_wrapper_1.default(common_1.register));
    app.use("/student", student_1.default);
    app.use((req, res) => {
        res.status(404).send("Not found");
    });
    app.use((err, req, res, next) => {
        logger_1.default.error({ error: err.message });
        res.json({ msg: "all fields are required" });
    });
}
exports.default = default_1;
