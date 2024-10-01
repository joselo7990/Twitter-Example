import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//crear POSTEO! ver tema del author!

function Home() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [id, setId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = () => {
    fetch("http://localhost:8080/post/post")
      .then((response) => response.json())
      .then((data) => setPost(data));
  };
  console.log(post);

  const comentarPost = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/post/post", {
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
      fetch(`http://localhost:8080/comments/comments/${id}`)
        .then((response) => response.json())
        .then((data) => setComments(data));
    };
    getCommentById();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="w-full max-w-2xl p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
          Posteos Recientes
        </h1>
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Nuevo Comentario
        </h2>
        <form onSubmit={(e) => comentarPost(e)}>
          <h2 className="text font-semibold text-blue-600 mb-1">Titulo</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Escribe tu comentario aquí..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></textarea>
          <h2 className="text font-semibold text-blue-600 mb-1">Contenido</h2>
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
            <p className="text-gray-800 mb-4">{p.user}</p>
            <Link to={`/newComment/${p._id}`}>
              <button className="w-full bg-blue-600 text-white py-1 rounded mt-2">
                Ver Comentarios
              </button>
            </Link>
          </div>
        ))}
        <div className="text-center mt-8">
          <p>Bienvenido! </p>

          <>
            <p>¿No estás registrado? ¡Regístrate aquí!</p>
            <Link to="/register" className="text-blue-600 underline text-2xl">
              Registrarse
            </Link>
            <p className="mt-4">¿Ya tienes una cuenta? ¡Inicia sesión aquí!</p>
            <Link to="/login" className="text-blue-600 underline text-2xl">
              Iniciar Sesión
            </Link>
          </>
        </div>
      </div>
    </div>
  );
}

export default Home;
