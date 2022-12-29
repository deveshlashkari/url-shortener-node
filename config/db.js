import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

//Function to connect DB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectToDB;
