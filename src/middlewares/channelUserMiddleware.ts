import { Request, Response, NextFunction } from "express";

export const checkChannelAndUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.channel && req.headers.userid) {
    next();
  } else {
    res.status(200).json({
      isError: true,
      errorCode: "MISSING_HEADERS",
      message: "Channel and userId headers are required",
      data: null,
    });
  }
};
