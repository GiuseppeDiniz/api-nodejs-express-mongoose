import { NextFunction, Request, Response } from "express";

export function can(permission: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req;

    next();
  };
}
