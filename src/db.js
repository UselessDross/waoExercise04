const mongoose = require('mongoose');

const databaseUrl = 'mongodb://localhost:27017/waoDB';



const connectToMongo = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Add a delay (adjust as needed)
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connectToMongo();