import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export async function getUserData(req, res, next) {
  // agarro el token
  const token = req.cookies.token;
  // si no existe el token no pasa
  if (!token) {
    return res.status(401).json({ mensaje: "No estas autorizado" });
  }
  // veritfy, secret y siguiente callBack function

  jwt.verify(token, "secret", (err, decoded) => {
    // si hay error retorna
    if (err) {
      return res.status(401).json({ mensaje: "No estas autorizado" });
    }
    // si esta correcto
    // decoded.email (esta decodificado/ desencriptado en decoded)
    User.findOne({ email: decoded.email })
      // ver excect
      .exec()
      .then((user) => {
        //si no existe user no pasa
        if (!user) {
          return res.status(401).json({ mensaje: "No estas autorizado" });
        }
        //agrego el campo user y lo igualo al usuario
        req.user = user;
        //segui
        next();
      });
  });
}
