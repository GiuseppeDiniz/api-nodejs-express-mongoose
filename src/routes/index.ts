import express, { type Express, type Request, type Response } from "express";
import authRotes from "./auths.routes";
import userRoutes from "./users.routes";
import roleRoutes from "./roles.routes";
import permissionRoutes from "./permissions.routes";
import sessionRoutes from "./session.routes";

const routes = (app: Express): void => {
  app.route("/").get((req: Request, res: Response): void => {
    res.status(200).send({ status: "200" });
  });

  app.use(
    express.json(),
    authRotes,
    roleRoutes,
    permissionRoutes,
    userRoutes,
    sessionRoutes
  );
};

export default routes;
