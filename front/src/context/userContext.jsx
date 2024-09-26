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
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        console.log("Correcto");
        window.document.cookie =
          "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlvQG1hcmlvIiwiaWF0IjoxNzI3MjAzODEyLCJleHAiOjE3Mjc4MDg2MTJ9.y2_EX9BgLOyx2DeCYfrFSWS0QHI_SDiI9xTPmFFUMHU; Max-Age=604800; Path=/; Expires=Tue, 01 Oct 2024 18:50:12 GMT";
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
