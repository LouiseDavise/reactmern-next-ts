import mongoose from 'mongoose';

let isConnected = false;

export const dbConnect = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;
    } catch (error){
        console.error('Error connecting to MongoDB:', error);
    }
}