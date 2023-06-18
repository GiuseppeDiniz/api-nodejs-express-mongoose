import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
