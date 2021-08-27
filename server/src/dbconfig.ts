import * as mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose.connect(<string>process.env.MONGO_URI)
  console.log('MongoDB connected');
}

