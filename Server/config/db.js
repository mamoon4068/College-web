import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Set MONGO_URI or MONGODB_URI in the server environment");
  }

  await mongoose.connect(uri, {
    dbName: "College-web",
  });
  console.log("MongoDB Connected Successfully");
};

export default connectDB;