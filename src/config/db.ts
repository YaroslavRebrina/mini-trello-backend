import mongoose from 'mongoose';
import config from './environment';

export const connectDB = async (): Promise<void> => {

};

export const disconnectDB = async (): Promise<void> => {
 try {
  await mongoose.disconnect();
  console.info('MongoDB Disconnected');
 } catch (error) {
  if (error instanceof Error) {
   console.error(`Error disconnecting from MongoDB: ${error.message}`);
  } else {
   console.error('Unknown error disconnecting from MongoDB');
  }
 }
};
