import express from 'express';

const port = process.env.PORT ?? 3000;

const app = express();

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Hello Word!');
});
