"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
function default_1(app) {
    app.get("/", (_req, res) => {
        logger_1.default.info("reached here");
        res.send("hello");
    });
}
exports.default = default_1;
