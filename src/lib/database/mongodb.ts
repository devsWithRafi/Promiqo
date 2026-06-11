import mongoose from 'mongoose';
import { env } from '../env';

const MONGODB_URI = env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

export default dbConnect;
