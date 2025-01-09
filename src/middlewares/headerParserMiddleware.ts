import { Request, Response, NextFunction } from "express";

export const parseHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const channel = req.headers.channel as string;
  const usercode = req.headers.usercode as string;
  const role = req.headers.role as string;
  const orgCode = req.headers.orgcode as string;
  const mode = req.headers.mode as string;
  const isAuth = req.headers.isauth as string;
  const id = req.headers.id as string;
  const ip = req.headers.ip as string;
  const userAgent = req.headers["user-agent"] as string;
  const reqAt = Date.now();

  const missingHeaders = [];

  if (!channel) missingHeaders.push("Channel");
  if (!usercode) missingHeaders.push("usercode");
  if (!role) missingHeaders.push("role");
  if (!orgCode) missingHeaders.push("orgCode");
  if (!mode) missingHeaders.push("mode");
  if (!isAuth) missingHeaders.push("isAuth");
  if (!ip) missingHeaders.push("ip");
  if (!id) missingHeaders.push("id");
  if (!userAgent) missingHeaders.push("userAgent");

  if (missingHeaders.length > 0) {
    res.status(200).json({
      isError: true,
      errorCode: "MISSING_HEADERS",
      message: `Missing required headers: ${missingHeaders.join(", ")}`,
      data: null,
    });
    return;
  }

  // @ts-ignore
  req.session = {
    id,
    channel,
    role,
    userCode: usercode,
    orgCode,
    mode,
    isAuth: isAuth === "true",
    ip,
    userAgent,
    reqAt,
  };

  next();
};
