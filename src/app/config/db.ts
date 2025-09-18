import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Attempting database connection...');
        
        if (mongoose.connection.readyState === 1) {
            console.log('Using existing database connection');
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

export default connectDB; 