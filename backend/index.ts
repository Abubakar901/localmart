import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';

const app: Express = express();
app.use(helmet())
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});