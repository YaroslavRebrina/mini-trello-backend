import mongoose from 'mongoose';
import { protect } from '../../middlwares/protect';
import { Router } from 'express';
const router = Router();
const Todo = mongoose.model('todos');
//@ts-ignore
router.post('/', protect, async (req, res) => {
 const newTodo = new Todo({
  ...req.body,
 });

 try {
  await newTodo.save();

  await res.json(newTodo);
 } catch (error) {
  res.status(422).send(error);
 }
});

export default router;
