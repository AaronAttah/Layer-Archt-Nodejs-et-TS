"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnect_1 = __importDefault(require("./config/dbConnect"));
const routes_1 = __importDefault(require("./routes"));
const error_1 = require("./middleware/error");
const winston_1 = __importDefault(require("winston"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = (process.env.PORT || process.env.PORT_NO);
mongoose_1.default.set("strictQuery", true);
/**
 * Log errors
 */
process.on("uncaughtException", (error) => {
    winston_1.default.error(error.message, error);
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    winston_1.default.error(error.message, error);
    process.exit(1);
});
/*
 * connecting DB
 */
(0, dbConnect_1.default)();
/**
 * Middlewares
 */
winston_1.default.add(new winston_1.default.transports.File({ filename: "logfile.log" }));
app.use(express_1.default.json());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use((0, morgan_1.default)("dev"));
app.get("/health", (req, res) => {
    res.send("health check glorious indeed!");
});
app.use("/api/v2/", routes_1.default);
app.get('/', (req, res) => {
    res.send("health check............ 🥰  woooolaah");
});
/**
 * error Handlers
 */
app.use(error_1.notFound);
app.use(error_1.errorHandler);
app.listen(port, () => {
    console.log(`Server started and listening on port ${port}...`);
});
exports.default = app;
