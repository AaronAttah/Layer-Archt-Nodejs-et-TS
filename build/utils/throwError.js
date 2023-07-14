"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const statusCodes_1 = __importDefault(require("./statusCodes"));
const throwError = (error, res, status = statusCodes_1.default.BAD_REQUEST) => {
    return res.status(status).json({
        error: {
            message: error
        }
    });
};
exports.throwError = throwError;
