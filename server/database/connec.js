import mongoose from 'mongoose';

async function connectToMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://spmeshramkar:Vish19988975@cluster0.8hzdgco.mongodb.net/bill-generator', {
            // Add connection options here if needed
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectToMongoDB;