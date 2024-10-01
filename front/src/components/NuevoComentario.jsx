import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function NuevoComentario() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState([]);
  const [isDelete, setIsDelete] = useState([]);

  const getCommentarios = () => {
    fetch(`http://localhost:8080/comments/comments/${postId}`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  };

  useEffect(() => {
    if (postId) {
      getCommentarios();
    }
  }, [postId]);
  useEffect(() => {
    if (postId) {
      fetch(`http://localhost:8080/post/post/${postId}`)
        .then((response) => response.json())
        .then((data) => setPost(data));
    }
  }, [postId]);

  const comentarPost = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/comments/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
      },
      credentials: "include", //que mande las cookies//
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data]);
        setNewComment("");
      });
  };
  const eliminarComentario = async (id) => {
    console.log(id);
    const res = await fetch(`http://localhost:8080/comments/comments/${id}`, {
      method: "DELETE",
      credentials: "include", //que mande las cookies//
    });
    console.log(res);
    if (res.status === 200) {
      getCommentarios();
    }
  };
  return (
    <div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="bg-white border border-blue-200 p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-2xl font-medium text-blue-500">Posteos:</h3>
          <h2 className="text-xl font-semibold text-blue-600 mb-2 mt-2">
            {post.title}
          </h2>
          <p className="text-gray-800 mb-4">{post.content}</p>
        </div>

        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Comentarios
        </h2>
        <div className="border-t border-gray-200 pt-4">
          {comments.length > 0 &&
            comments.map((c) => (
              <ul className="list-none space-y-2 mt-2" key={c._id}>
                <li className="flex items-center text-gray-600">
                  <span>💬 {c.content}</span>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded ml-5"
                    onClick={() => eliminarComentario(c._id)}
                  >
                    Eliminar comentario
                  </button>
                </li>
              </ul>
            ))}
        </div>
        <h2 className="text-xl font-semibold text-blue-600 mb-4">
          Nuevo Comentario
        </h2>
        <form onSubmit={(e) => comentarPost(e)}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Escribe tu comentario aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Publicar Comentario
          </button>
          <Link to={"/"}>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mt-5"
            >
              Volver
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default NuevoComentario;
