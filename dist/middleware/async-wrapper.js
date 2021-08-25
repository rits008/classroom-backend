"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncMiddleware = void 0;
const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.asyncMiddleware = asyncMiddleware;
