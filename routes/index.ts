import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import * as PostController from '../controllers/post.controller';

const router = Router();

// User Routes
router.get('/users', UserController.getUsers);

// Post Routes
router.get('/posts', PostController.getAllPosts);
router.get('/posts/user/:userId', PostController.getPostsByUser);
router.post('/posts', PostController.createPost);
router.put('/posts/:postId', PostController.editPost);
router.delete('/posts/:postId', PostController.deletePost);

export default router;
