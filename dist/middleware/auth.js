"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstructor = exports.isAuthorizedUser = void 0;
const logger_1 = __importDefault(require("../logger"));
const common_1 = require("../api/common");
const ErrorHandler_1 = __importDefault(require("../errors/ErrorHandler"));
const token_1 = require("../token");
const isAuthorizedUser = async (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization)
        return next(ErrorHandler_1.default.forbiddenError("no token provided"));
    const token = authorization.split(" ")[1];
    const payload = token_1.decodeToken(token);
    logger_1.default.info(`payload: ${JSON.stringify(payload)}`);
    if (!payload)
        return next(ErrorHandler_1.default.forbiddenError("invalid token"));
    const user = await common_1.getUserById(payload.userId);
    if (!user)
        return next(ErrorHandler_1.default.notFoundError("user not found"));
    req.user = user;
    next();
};
exports.isAuthorizedUser = isAuthorizedUser;
const isInstructor = async (req, res, next) => {
    if (!req.user.isInstructor)
        return next(ErrorHandler_1.default.forbiddenError("not an instructor"));
    next();
};
exports.isInstructor = isInstructor;
