import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateRequest(schema: Joi.Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(200).json({
        isError: true,
        errorCode: "VALIDATION_ERROR",
        message: "Invalid request",
        data: {
          key: error.details[0].context?.key,
          message: error.details[0].message,
        },
      });
    }
    next();
  };
}
