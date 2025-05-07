import { Router } from 'express';
import todoRoutes from './todos';
import userRoutes from './users';

const router = Router();

router.use('/todo', todoRoutes);
router.use('/user', userRoutes);

export default router;
