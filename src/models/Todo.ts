import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
 label: {
  type: String,
  required: true,
 },
});

mongoose.model('todos', todoSchema);
