import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI: string =
  process.env.MONGODB_URI || "MONGODB_URI does not exist in .env file.";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("mongodb is successfully connected");
    } catch (err: any) {
        console.error(err.message);
        // process.exit(1);
    }
};

export default connectDB;