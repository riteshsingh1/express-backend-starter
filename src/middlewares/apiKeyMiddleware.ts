import { env } from "@/config/env";
import { Request, Response, NextFunction } from "express";

export const checkApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["x-api-key"] === env.API_KEY) {
    next();
  } else {
    res.status(200).json({
      isError: true,
      errorCode: "INVALID_API_KEY",
      message: "Unauthorized",
      data: null,
    });
  }
};
