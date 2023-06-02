import {NextFunction, Request, Response} from 'express';
import winston from 'winston';
// import statusCodes from '../utils/statusCodes';
import statusCodes from '../utils/statusCodes'



export const notFound = ( req: Request, res: Response, next: NextFunction) => {
    // 
      const error = new Error(`Not Found. : ${req.originalUrl}`);
    //   console.log(error)
      res.status(409);
      next(error);
    };

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    winston.error(error.message, error);


    return res.status(statusCodes.SERVER_ERROR).json({
        error: {
            message: error.message
        }
    });
}

