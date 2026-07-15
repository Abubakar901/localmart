
import mongoose from 'mongoose';
import { mongoURL } from '../constants.ts';

if (!mongoURL) {
  console.error("Error: MONGO_URL variable is missing.");
  process.exit(1);
}

const connectDB = () => {
    mongoose.connect(mongoURL)
    .then(() => console.log('Successfully connected to Railway MongoDB'))
    .catch(err => console.error('Database connection error:', err));
}

export default connectDB;