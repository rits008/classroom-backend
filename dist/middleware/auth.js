"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorizedUser = void 0;
const logger_1 = __importDefault(require("../logger"));
const token_1 = require("../token");
const isAuthorizedUser = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        throw new Error("No token provided");
    const token = authorization.split(" ")[1];
    const payload = token_1.decodeToken(token);
    logger_1.default.info(`${payload}`);
};
exports.isAuthorizedUser = isAuthorizedUser;
