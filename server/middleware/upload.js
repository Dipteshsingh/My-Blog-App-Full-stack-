import multer from 'multer';
import path from 'path';

// Set up storage
const storage = multer.memoryStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Middleware for single image
const upload = multer({ storage });

export default upload;
