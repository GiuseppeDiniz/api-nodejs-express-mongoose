import express, { type Express } from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import db from "./config/dbConnect";
import routes from "./routes";

const app: Express = express();

db.on("error", (error: Error) => {
  console.error("Erro de conexão:", error);
});

db.once("open", () => {
  // Executado quando a conexão com o banco de dados é estabelecida com sucesso
});

/*
  ## Middlewares
*/
app.use(express.json());
app.use(cors());
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Nome da API",
      description: "Descrição da API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//routes
routes(app);

export default app;
