import mongoose from 'mongoose';
import { protect } from '../../middlwares/protect';
import { Router, Request, Response } from 'express';

const router = Router();
const Todo = mongoose.model('todos');

interface TodoDocument {
 label: string;
 email: string;
 createdAt?: Date;
 updatedAt?: Date;
}

router.post(
 '/',
 protect,
 async (
  req: Request,
  res: Response<TodoDocument | { message: string }>
 ): Promise<void> => {
  try {
   const { label, email } = req.body as TodoDocument;

   if (!label || !email) {
    res.status(400).json({ message: 'Label and email are required' });
   }

   const newTodo = new Todo({ label, email });
   await newTodo.save();

   res.status(201).json(newTodo);
  } catch (error) {
   console.error('Error creating todo:', error);
   res.status(422).json({ message: 'Error creating todo' });
  }
 }
);

router.get(
 '/',
 protect,
 async (
  req: Request,
  res: Response<TodoDocument[] | { message: string }>
 ): Promise<void> => {
  try {
   const email = req.query.email as string;

   if (!email) {
    res.status(400).json({ message: 'Email is required' });
   }

   const todos = await Todo.find({ email }).sort({ createdAt: 'desc' });
   res.json(todos);
  } catch (error: any) {
   console.error('Error fetching todos:', error);
   res.status(500).json({
    message: 'Error fetching todos',
   });
  }
 }
);

router.put(
 '/:id',
 protect,
 async (
  req: Request,
  res: Response<TodoDocument | { message: string }>
 ): Promise<void> => {
  try {
   const { id } = req.params;
   const { label, email } = req.body as TodoDocument;

   if (!label || !email) {
    res.status(400).json({ message: 'Label and email are required' });
   }

   const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, email },
    { label },
    { new: true }
   );

   if (!updatedTodo) {
    res.status(404).json({ message: 'Task not found' });
   }

   res.json(updatedTodo);
  } catch (error: any) {
   console.error('Error updating todo:', error);
   res.status(500).json({
    message: 'Error updating todo',
   });
  }
 }
);

router.delete(
 '/:id',
 protect,
 async (req: Request, res: Response<{ message: string }>): Promise<void> => {
  try {
   const { id } = req.params;
   const { email } = req.body as TodoDocument;

   if (!email) {
    res.status(400).json({ message: 'Email is required' });
   }

   const deletedTodo = await Todo.findOneAndDelete({ _id: id, email });

   if (!deletedTodo) {
    res.status(404).json({ message: 'Task not found' });
   }

   res.status(204).send();
  } catch (error: any) {
   console.error('Error deleting todo:', error);
   res.status(500).json({
    message: error,
   });
  }
 }
);

export default router;
