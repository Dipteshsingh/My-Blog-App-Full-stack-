import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import blogRouter from './routes/blogRoute.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import commentRouter from './routes/commentRoute.js';
import path from 'path'
dotenv.config()
const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
const _dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(_dirname,'/client/dist')))
// app.get('*',(_,res)=>{
//   res.sendFile(path.resolve(_dirname,'client','dist','index.html'))
// })


// api end points
app.use('/api/blogs',blogRouter)
app.use('/api/user',userRouter)
app.use('/api/comment',commentRouter)


app.get('/',(req,res)=>{
  res.send('Working.......')
})


connectDB();

app.listen(port,()=>{
  console.log(`server is runnimg on port ${port}`);
  
})
