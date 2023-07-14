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
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const accountVerification_1 = __importDefault(require("./accountVerification"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const soft_delete_mongoose_plugin_1 = require("soft-delete-mongoose-plugin");
const mongoose_2 = require("mongoose");
// defind soft delete field name
const IS_DELETED_FIELD = 'isDeleted';
const DELETED_AT_FIELD = 'deletedAt';
// use soft delete plugin
(0, mongoose_2.plugin)(new soft_delete_mongoose_plugin_1.SoftDelete({
    isDeletedField: IS_DELETED_FIELD,
    deletedAtField: DELETED_AT_FIELD,
}).getPlugin());
exports.userSchema = new mongoose_1.default.Schema({
    // first_name: { type: String, required: false},
    // last_name: {type: String, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    // phone_code: {type: String, required: true},
    // phone: {type: String, required: true},
    // role:[{type: String}],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
exports.userSchema.methods.generateOTP = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const OTP = otp_generator_1.default.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        yield accountVerification_1.default.findOneAndDelete({ user: this.id }).exec();
        yield accountVerification_1.default.create({ user: this.id, otp: OTP });
        return OTP;
    });
};
exports.userSchema.methods.verifyAccount = function (otp) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbOtp = yield accountVerification_1.default.findOne({ user: this.id, otp: otp }).exec();
        if (!dbOtp) {
            return {
                success: false,
                message: 'The OTP provided is not valid',
            };
        }
        this.isVerified = true;
        yield this.save();
        yield accountVerification_1.default.findOneAndDelete({ user: this.id, otp: otp }).exec();
        return {
            success: true,
        };
    });
};
exports.userSchema.methods.generateToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this.id, first_name: this.first_name, last_name: this.last_name }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN });
    return token;
};
exports.default = mongoose_1.default.model('User', exports.userSchema);
