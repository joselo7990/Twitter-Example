import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState([]);

  //RegistrarunUusuario
  const register = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
        },
        credentials: "include", //que mande las cookies//
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        console.log("Correcto");
        alert("registrado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logIn = async (data) => {
    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
        },
        credentials: "include", //que mande las cookies//
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        console.log("Correcto");

        alert("LOGEADO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        register,
        logIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
