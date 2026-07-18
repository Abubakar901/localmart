import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL!;

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGODB_URL);
  console.log('MongoDB connected');
};