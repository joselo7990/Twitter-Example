import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

function Login(params) {
  const { logIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await logIn({ email, password });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-blue-600">Ingresar</h1>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full p-2 border border-gray-300 rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to={"/"}>
              <button className="w-full bg-blue-600 text-white py-2 rounded">
                Ingresar
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
