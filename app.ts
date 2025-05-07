import express, { Application } from 'express';
import cors from 'cors';
import routes from './src/routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(
 cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);
app.use(errorHandler);

export default app;
