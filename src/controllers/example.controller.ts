import { exampleService } from "@/services/example.service";
import { NextFunction, Request, Response } from "express";

const hello = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await exampleService.hello();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const exampleController = {
  hello,
};
