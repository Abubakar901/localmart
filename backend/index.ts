import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';

import connectDB from './src/db/index.ts';
import { port } from './src/constants.ts';

const app: Express = express();
app.use(helmet())
app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});