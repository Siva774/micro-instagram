import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { user_id, title, description, images } = req.body;
    
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPost = new Post({ title, description, user_id, images });
    await newPost.save();

    user.post_count += 1;
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Get posts of a user
export const getPostsByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ user_id: userId }).populate('user_id', 'name mobile_number');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().populate('user_id', 'name mobile_number');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

// Edit a post
export const editPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { title, description, images } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.description = description;
    post.images = images;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error editing post', error });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const user = await User.findById(post.user_id);
    if (user) {
      user.post_count -= 1;
      await user.save();
    }

    await post.remove();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};
