

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const connection = await mongoose.connect(
//       process.env.MONGO_URI
//     );

//     console.log(
//       `MongoDB Connected: ${connection.connection.host}`
//     );

//     console.log(
//       `Database Name: ${connection.connection.name}`
//     );

//   } catch (error) {
//     console.error("MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;




import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
  //next use chatgpt
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "College-web",
  });
  console.log("connected Databse:", mongoose.connection.name);

};

export default connectDB;
