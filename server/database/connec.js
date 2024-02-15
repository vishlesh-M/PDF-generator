import mongoose from 'mongoose';

async function connectToMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/dac_project', {
            
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToMongoDB;