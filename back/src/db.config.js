import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/twitter";
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
