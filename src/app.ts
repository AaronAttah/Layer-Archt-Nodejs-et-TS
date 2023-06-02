import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import dbConnect from "./config/dbConnect";
import routes from './routes';
import {errorHandler, notFound} from './middleware/error';
import winston from "winston";

const app = express();
dotenv.config();
const port: string = (process.env.PORT || process.env.PORT_NO)!;

mongoose.set("strictQuery", true);

/**
 * Log errors
 */
process.on("uncaughtException", (error: Error) => {
  winston.error(error.message, error);
  process.exit(1);
});

process.on("unhandledRejection", (error: Error) => {
  winston.error(error.message, error);
  process.exit(1);
});


/*
 * connecting DB
 */
dbConnect();

/**
 * Middlewares
 */
winston.add(new winston.transports.File({ filename: "logfile.log" }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.send("health check glorious indeed!")

})

app.use("/api/v2/", routes);

/**
 * error Handlers
 */
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started and listening on port ${port}...`);
});
 
export default app;
