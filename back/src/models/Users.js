import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "El name es obligatorio"],
  },
  profilePicture: {
    type: String,
    default: "defaultProfilePic.jpg", // URL o ruta de la imagen por defecto
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
