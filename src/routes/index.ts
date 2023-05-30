import express, { type Express, type Request, type Response } from "express";
import userRoutes from "./users.routes";

const routes = (app: Express): void => {
  app.route("/").get((req: Request, res: Response): void => {
    res.status(200).send({ status: "200" });
  });

  app.use(express.json(), userRoutes);
};

export default routes;
