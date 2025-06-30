import express from 'express'
import { allBlogs, createBlog, deleteBlog, dislikeBlog, getMyTotalBlogLikes, getPublishedBlogs, likeBlog, singleBlog, togglePublishBlog, updateBlog } from '../controllers/blogController.js'
import isAuthenticated from '../middleware/auth.js'
import upload from '../middleware/upload.js'
const blogRouter = express.Router()

blogRouter.post('/create',isAuthenticated,createBlog)
blogRouter.get('/my-blogs',isAuthenticated,allBlogs)
blogRouter.get('/blog/:id',singleBlog)
blogRouter.delete('/delete/:id',isAuthenticated,deleteBlog)
blogRouter.put('/update/:id',upload.single('file'),updateBlog)
blogRouter.get('/get-published-blogs',isAuthenticated,getPublishedBlogs)
blogRouter.patch('/:blogId',togglePublishBlog)


blogRouter.get('/:id/like',isAuthenticated,likeBlog)
blogRouter.get('/:id/dislike',isAuthenticated,dislikeBlog)
blogRouter.get('/my-blogs/likes',isAuthenticated,getMyTotalBlogLikes)



export default blogRouter;