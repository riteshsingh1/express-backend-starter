import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    session: {
      channel: string;
      role: string;
      userCode: string;
      orgCode: string;
      mode: string;
      isAuth: boolean;
      ip: string;
      userAgent: string;
      reqAt: number;
      id: string;
    };
  }
}

export {};
