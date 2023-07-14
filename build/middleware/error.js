"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const winston_1 = __importDefault(require("winston"));
// import statusCodes from '../utils/statusCodes';
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
const notFound = (req, res, next) => {
    // 
    const error = new Error(`Not Found. : ${req.originalUrl}`);
    //   console.log(error)
    res.status(409);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (error, req, res, next) => {
    winston_1.default.error(error.message, error);
    return res.status(statusCodes_1.default.SERVER_ERROR).json({
        error: {
            message: error.message
        }
    });
};
exports.errorHandler = errorHandler;
