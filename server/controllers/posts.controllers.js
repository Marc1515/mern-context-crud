import Post from "../models/Post.js";
import { uploadImage, deletedImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a post
export const createPosts = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;

    console.log(req.files.image);

    if (req.files.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newPost = new Post({ title, description, image });

    await newPost.save();

    return res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a post
export const updatePosts = async (req, res) => {
  try {
    const postUpdated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(postUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a post
export const deletePosts = async (req, res) => {
  try {
    const postRemoved = await Post.findByIdAndDelete(req.params.id);
    if (!postRemoved) return res.sendStatus(404);

    if (postRemoved.image.public_id) {
      await deletedImage(postRemoved.image.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a post
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.sendStatus(404);
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
