import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { throwError } from "../../utils/throwError";
import { formatResult } from "./formatResult";

export const registerUserValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
   
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const result = formatResult(schema.validate(req.body));

  if (result.error) return throwError(result.message, res);

  next();
};
