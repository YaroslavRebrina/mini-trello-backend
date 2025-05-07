// routes/index.js or routes/index.mjs (depending on your setup)
import { Router } from 'express';
import todoRoutes from './todos';

const router = Router();

router.use('/todo', todoRoutes);

export default router;
