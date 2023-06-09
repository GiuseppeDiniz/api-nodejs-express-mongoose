import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
require("dotenv/config");

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  const [, token] = authToken.split(" ");
  verify(token, `${process.env.MY_256_BIT_SECRET}`, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    // Se o token for válido, você pode acessar o `decoded.userId` ou qualquer informação adicional contida no token

    // Você pode adicionar as informações do usuário decodificadas no objeto `req` para uso posterior
    // Exemplo: req.userId = decoded.userId;

    next(); // Chama a próxima função/middleware após a validação do token
  });
};
