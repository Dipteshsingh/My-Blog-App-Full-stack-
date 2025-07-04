import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors'
import blogRouter from './routes/blogRoute.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import commentRouter from './routes/commentRoute.js';
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for both dev and prod
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://blog-app-mern-6.onrender.com'
  ],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Serve frontend
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// API routes
app.use('/api/blogs', blogRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

// Health check
app.get('/', (req, res) => {
  res.send('Working.......');
});

connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
