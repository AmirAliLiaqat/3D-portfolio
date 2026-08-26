import mongoose from "mongoose";

let connectionPromise = null;

export const connectDB = async () => {
  // If already fully connected (readyState === 1), return active connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is not started yet, initiate mongoose.connect()
  if (!connectionPromise) {
    const mongoUri =
      process.env.MONGODB_URI ||
      "mongodb+srv://amirliaqat2020:Secureatlas2023@3d-portfolio.npfrth0.mongodb.net/portfolio?retryWrites=true&w=majority";

    connectionPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    await connectionPromise;
    // Wait until connection state transitions to 1 (connected)
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connection.asPromise();
    }
    return mongoose.connection;
  } catch (error) {
    connectionPromise = null;
    console.error("MongoDB Atlas Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;
