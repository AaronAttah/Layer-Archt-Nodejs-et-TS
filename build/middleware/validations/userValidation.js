"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const throwError_1 = require("../../utils/throwError");
const formatResult_1 = require("./formatResult");
const registerUserValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
    });
    const result = (0, formatResult_1.formatResult)(schema.validate(req.body));
    if (result.error)
        return (0, throwError_1.throwError)(result.message, res);
    next();
};
exports.registerUserValidation = registerUserValidation;
