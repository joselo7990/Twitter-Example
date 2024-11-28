import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NODE_ENV } from "../config.js";

export const createUser = async (req, res) => {
  try {
    //obtengo los datos del usuario
    const { email, password, name } = req.body;
    const profilePicture = req.file;

    // chequeo si el usuario existe
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).json({ mensaje: "el usuario ya existe" });
    }
    //haseo la contrasena
    const hashPasword = bcrypt.hashSync(password, 8);
    console.log(hashPasword);
    const newUser = new User({
      email,
      password: hashPasword,
      name,
      profilePicture: profilePicture?.filename,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
export const logOut = (req, res) => {
  res.clearCookie("token").end();
};
export const logIn = async (req, res) => {
  //obtengo los datos usuario
  const { email, password } = req.body;
  // busco el usuario en la base de datos
  const checkUser = await User.findOne({ email: email });
  if (!checkUser) {
    res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  // comparo las contrasenas
  if (!password) {
    res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  const match = bcrypt.compareSync(password, checkUser.password);
  if (!match) {
    return res.status(400).json({ mensaje: "Credenciales invalidas" });
  }
  //genero token
  const token = jwt.sign(
    {
      email,
    },
    "secret",
    {
      expiresIn: "7d",
    }
  );
  //seteo la cookie en el token ??
  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    //config para deployado
    httpOnly: true,
    secure: NODE_ENV === "development" ? false : true,
    sameSite: "none",
  });
  //respondo
  res.json({ mensaje: "Usuario logueado con exito", token, user: checkUser });
};
