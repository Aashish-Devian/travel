import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MongoDB connection URI not found. Please set MONGO_URI environment variable."
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// mongoose.set("strictQuery", false);
// const connectDB = async() => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     console.log("MongoDB database connected");
//   } catch (error) {
//     console.log("MongoDB database connection failed");
//   }
// }

export default connectDB;
