import express, { type Express, Application, Request, Response } from "express";
import db from "./config/dbConnect";
import routes from "./routes";

const app: Express = express();

db.on("error", (error: Error) => {
  console.error("Erro de conexão:", error);
});

db.once("open", () => {
  // Executado quando a conexão com o banco de dados é estabelecida com sucesso
});

// Middlewares
app.use(express.json());
routes(app);

export default app;
