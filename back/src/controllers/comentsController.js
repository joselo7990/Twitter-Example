import Post from "../models/Posts.js";
import Comment from "../models/Comentarios.js";
import User from "../models/Users.js";

//traer comentrios relacionados con un ID

export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comment = await Comment.find({ postId });
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// eliminar comentarios

export const deleteComments = async (req, res) => {
  const user = req.user._id;
  const commentId = req.params.commentId;

  try {
    // identificador unico del comentario y guardo el id de la base de datos
    const comment = await Comment.findOne({ _id: commentId });
    // si el que realizo el comentario es igual al usuario
    console.log(comment.author.toString(), user.toString());
    if (comment.author.toString() === user.toString()) {
      // elimino el comentario

      await Comment.findByIdAndDelete({ _id: commentId });
      res.status(200).json("ok");
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

// crear comentarios

export const createComments = async (req, res) => {
  const { postId } = req.params;
  const author = req.user._id;
  const { content } = req.body;

  try {
    // Crear el post si el título y el contenido están presentes
    if (content) {
      const newComment = new Comment({
        postId,
        content,
        author,
      });

      // Guardar el post en la base de datos
      await newComment.save();

      // Devolver una respuesta exitosa
      res.status(201).json(newComment);
    } else {
      res.status(400).json({ message: "el contenido son obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};
