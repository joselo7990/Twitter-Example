import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { API_URL } from "../config";

//crear POSTEO! ver tema del author!
//login derecha
//estetica
//logout
//elimnar posteo

function Home() {
  const { user, logOut } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  console.log(user);
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = () => {
    fetch(API_URL + "/post/post")
      .then((response) => response.json())
      .then((data) => setPost(data));
  };

  const comentarPost = (e) => {
    e.preventDefault();
    fetch(API_URL + "/post/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
      },
      credentials: "include", //que mande las cookies//
      body: JSON.stringify({ title: newTitle, content: newContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost([...post, data]);
        setNewTitle(""); // Limpiar el campo del título
        setNewContent(""); // Limpiar el campo del contenido
      });
  };

  useEffect(() => {
    if (id === "") {
      return;
    }
    const getCommentById = () => {
      fetch(API_URL + `/comments/comments/${id}`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    };
    getCommentById();
  }, [id]);

  const eliminarPosteo = async (id) => {
    console.log(id);
    const res = await fetch(API_URL + `/post/post/${id}`, {
      method: "DELETE",
      credentials: "include", //que mande las cookies//
    });
    console.log(res);
    if (res.status === 200) {
      getAllPost();
    }
  };
  // input date //
  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <div className="flex justify-end p-4 bg-white shadow-md">
        {user ? (
          <div>
            <h2>User : {user.name}</h2>
            <button
              onClick={() => {
                logOut();
              }}
              className="bg-red-600 rounded text-white px-2 py-2"
            >
              Log out
            </button>
            <img
              src={API_URL + `/uploads/${user.profilePicture}`}
              className="w-10 h-10"
            ></img>
          </div>
        ) : (
          <div>
            {" "}
            <Link to="/login">
              <button className="mr-4 bg-blue-500 text-white py-2 px-4 rounded">
                Iniciar Sesión
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                Registrarse
              </button>
            </Link>{" "}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <div className="w-full max-w-2xl p-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
            Posteos Recientes
          </h1>
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Posteo</h2>
          {user ? (
            <form onSubmit={(e) => comentarPost(e)}>
              <h2 className="text font-semibold text-blue-600 mb-1">Titulo</h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Escribe tu comentario aquí..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              ></textarea>
              <h2 className="text font-semibold text-blue-600 mb-1">
                Contenido
              </h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Escribe tu comentario aquí..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded mb-5"
              >
                Publicar Posteo
              </button>
            </form>
          ) : (
            <></>
          )}

          <h3 className="text-2xl font-medium text-blue-500 mb-5">Posteos:</h3>
          {post.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-blue-200 p-6 rounded-xl shadow-md mb-8"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2 mt-2">
                {p.title}
              </h2>
              <p className="text-gray-800 mb-4">{p.content}</p>
              <p className="text-gray-800 mb-4">Creado por: {p.author.email}</p>
              <button
                onClick={() => {
                  eliminarPosteo(p._id);
                }}
                className="bg-red-600 rounded px-3 py-2 text-white"
              >
                Eliminar Posteo
              </button>
              <Link to={`/newComment/${p._id}`}>
                <button className="w-full bg-blue-600 text-white py-1 rounded mt-2">
                  Ver Comentarios
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
