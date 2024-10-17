import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) || null
  );

  //RegistrarunUusuario
  const register = async (data) => {
    try {
      const res = await fetch(API_URL + "/users/register", {
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
      const res = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
        },
        credentials: "include", //que mande las cookies//
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        console.log("Correcto");

        const data = await res.json();

        setUser(data.user);
        window.localStorage.setItem("user", JSON.stringify(data.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = async () => {
    const res = await fetch(API_URL + "/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
      },
      credentials: "include", //que mande las cookies//
    });
    if (res.status === 200) {
      window.localStorage.removeItem("user");
      setUser(null);
    }
  };
  return (
    <UserContext.Provider
      value={{
        register,
        logIn,
        user,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
