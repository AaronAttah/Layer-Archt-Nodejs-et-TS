"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
const user_services_1 = __importDefault(require("../services/user.services"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_services_1.default.createUser(req.body);
        return res.status(data.STATUS_CODE).json({
            status: data.STATUS,
            message: data.MESSAGE,
            data: data.DATA
        });
    }
    catch (error) {
        // console.log(error)
        return res.status(statusCodes_1.default.SERVER_ERROR).json({
            status: "failed",
            error: error,
        });
    }
});
exports.create = create;
