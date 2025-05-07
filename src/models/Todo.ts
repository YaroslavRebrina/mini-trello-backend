import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema(
 {
  label: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   required: true,
  },
 },
 {
  timestamps: true,
 }
);

export default mongoose.model('todos', todoSchema);
