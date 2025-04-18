import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Todo List API');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
