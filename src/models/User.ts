import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
 email: {
  type: String,
  required: true,
 },
});

mongoose.model('users', userSchema);
