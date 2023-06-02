import { Response } from "express";
import statusCodes from "./statusCodes";

export const throwError = (error: any, res: Response, status: number = statusCodes.BAD_REQUEST) => {
    return res.status(status).json({
        error: {
            message: error
        }
    });
}