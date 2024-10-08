import Post from "../models/Posts.js";
import User from "../models/Users.js";
import mongoose from "mongoose";
//get posteos
export const getAllPost = async (req, res) => {
  try {
    //buscar todos los posteos
    const posteos = await Post.find().populate("author");
    res.status(200).json(posteos);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// create posteos

export const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Crear el post si el título y el contenido están presentes
    if (title && content) {
      const newPost = new Post({
        title,
        content,
        author: req.user._id,
      });

      // Guardar el post en la base de datos
      await newPost.save();

      // Devolver una respuesta exitosa
      res.status(201).json(newPost);
    } else {
      res
        .status(400)
        .json({ message: "El título y el contenido son obligatorios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear el post", error });
  }
};

//get posteos byId

export const getPostByID = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId).populate("author");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//elimiar posteos by Id

export const deleteById = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findOne({ _id: postId });
    console.log(post);
    if (post.author.toString() == req.user._id.toString()) {
      await Post.findByIdAndDelete({ _id: postId });
      res.status(200).json("ok");
    } else {
      res.status(500).json({ eror: "no pudiste eliminar" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
