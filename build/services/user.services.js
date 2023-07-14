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
const statusCodes_1 = __importDefault(require("../utils/statusCodes"));
const user_db_1 = __importDefault(require("../repositories/user.db"));
class UserService {
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_db_1.default.findOneByEmail(data.email);
            if (user)
                return {
                    STATUS_CODE: statusCodes_1.default.BAD_REQUEST,
                    STATUS: "failed ",
                    MESSAGE: "user already exist",
                };
            const createduser = yield user_db_1.default.create(data);
            console.log({ data: data });
            return {
                STATUS_CODE: statusCodes_1.default.CREATED,
                STATUS: "success",
                MESSAGE: "created successfully",
                DATA: createduser,
            };
        });
    }
}
exports.default = UserService;
