import dotenv from 'dotenv';

dotenv.config(); 

// application constants
export const mongoURL = process.env.MONGO_URL || '';
export const port = Number(process.env.PORT) || 3000; 
