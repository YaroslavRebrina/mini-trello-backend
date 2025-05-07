import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(
 cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: [
   'Content-Type',
   'Authorization',
   'X-Requested-With',
   'Accept',
   'Origin',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400,
 })
);

app.options('*', (req: Request, res: Response) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header(
  'Access-Control-Allow-Methods',
  'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
 );
 res.header(
  'Access-Control-Allow-Headers',
  'Content-Type, Authorization, X-Requested-With, Accept, Origin'
 );
 res.status(200).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/health', (req: Request, res: Response) => {
 res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.use('/api', routes);
app.use(errorHandler);

export default app;
