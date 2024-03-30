import mongoose from "mongoose";

//connecting database
const connectDB = async (DATABASE_URI) => {
  try {
    const DB_OPTIONS = {
      dbName: "geekshop",
    }
    await mongoose.connect(DATABASE_URI, DB_OPTIONS);
    console.log("connected successfully");
  } catch (error) {
    console.log(error);
  }
};


export default connectDB