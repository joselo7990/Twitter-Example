import { useState } from "react";
import UserContextProvider from "./context/userContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Registrer from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NuevoComentario from "./components/NuevoComentario";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/register" element={<Registrer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/newComment/:postId" element={<NuevoComentario />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
