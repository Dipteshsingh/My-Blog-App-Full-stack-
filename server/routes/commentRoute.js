import express from 'express';
import isAuthenticated from '../middleware/auth.js';
import {
  createComment,
  deleteComment,
  editComment,
  getAllCommentsOnMyBlogs,
  getCommentsOfPost,
  likeComment
} from '../controllers/commentController.js';

const commentRouter = express.Router();

// Create a new comment for a specific blog post
commentRouter.post('/create/:postId', isAuthenticated, createComment);

// Like or unlike a comment
commentRouter.post('/likes/:id', isAuthenticated, likeComment);

// Delete a specific comment
commentRouter.delete('/delete/:id', isAuthenticated, deleteComment);

// Update (edit) a comment
commentRouter.put('/update/:id', isAuthenticated, editComment);

// ✅ FIX: Add postId to get comments of a specific blog
commentRouter.get('/post-comment/:id', getCommentsOfPost);

// Get all comments on blogs authored by the logged-in user
commentRouter.get('/all-comment', isAuthenticated, getAllCommentsOnMyBlogs);

export default commentRouter;
