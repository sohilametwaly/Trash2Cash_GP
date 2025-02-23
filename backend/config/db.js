import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to Mongo");
  } catch (error) {
    console.log("Error connecting to Mongo ", error);
  }
}

export default connectToDB;
