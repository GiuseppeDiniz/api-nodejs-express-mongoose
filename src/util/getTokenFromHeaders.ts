import { Request } from "express";

export function getTokenFromHeaders(req: Request): string {
  const authHeader =
    req.headers["x-authorization"] || req.headers["authorization"] || "";
  const token = (authHeader as string)?.split(" ")[
    (authHeader as string)?.split(" ").length - 1
  ];
  return token;
}
