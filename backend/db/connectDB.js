import mongoose from "mongoose";

const connectDB = async () => {
  
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MongoDB connection URI not found. Please set MONGO_URI environment variable."
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


