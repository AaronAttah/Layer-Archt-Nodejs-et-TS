"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../middleware/validations/userValidation");
const userRoutes = express_1.default.Router();
userRoutes.post("/", userValidation_1.registerUserValidation, userController_1.create);
userRoutes.get("/", (req, res) => {
    return res.send("health check on users routes");
});
exports.default = userRoutes;
