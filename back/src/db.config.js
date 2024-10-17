import mongoose from "mongoose";
import { DB_URL } from "./config.js";

// const MONGO_URI = "mongodb://127.0.0.1:27017/twitter";
const MONGO_URI = DB_URL;
// "mongodb+srv://jose:josejose@cluster0.tsase.mongodb.net/twitter?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
