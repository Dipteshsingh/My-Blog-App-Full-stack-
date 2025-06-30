import express from 'express'
import { getAllUsers, loginUser, registerUser, updateUser } from '../controllers/userController.js'
import isAuthenticated from '../middleware/auth.js'
import upload from '../middleware/upload.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.put('/profile/update',isAuthenticated,upload.single('file'),updateUser)
userRouter.get('/allUsers',getAllUsers)

export default userRouter;