import express, { Application } from 'express';

import routes from './src/routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use(errorHandler);

export default app;
