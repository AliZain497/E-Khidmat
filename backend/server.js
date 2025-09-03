// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sliderRoutes from './routes/sliderRoutes.js';
import Slider from './models/Slider.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json()); // for parsing JSON

app.use('/api/sliders', sliderRoutes)
// Static folders
app.use('/sliders', express.static(path.join(__dirname, 'public/sliders')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// ===================== MULTER CONFIG =====================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/sliders/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// ===================== MONGOOSE MODEL =====================
const sliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  altText: { type: String, default: '' },
  order: { type: Number, default: 0 },
});
// const Slider = mongoose.model('Slider', sliderSchema);

// ===================== API ROUTES =====================

// 👉 Upload Image (used by Admin Panel)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imageUrl = `http://localhost:${PORT}/sliders/${req.file.filename}`;
  res.status(201).json({ imageUrl });
});

// 👉 Get All Sliders
app.get('/api/sliders', async (req, res) => {
  try {
    const sliders = await Slider.find().sort('order');
    res.json(sliders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sliders' });
  }
});

// 👉 Create New Slider
app.post('/api/sliders', async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const newSlider = new Slider({ imageUrl });
    await newSlider.save();
    res.status(201).json(newSlider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save slider' });
  }
});

// 👉 Update Slider
app.put('/api/sliders/:id', async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) {
      return res.status(404).json({ error: 'Slider not found' });
    }

    slider.imageUrl = req.body.imageUrl ?? slider.imageUrl;

    const updatedSlider = await slider.save();
    res.json(updatedSlider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update slider' });
  }
});

// 👉 Delete Slider
app.delete('/api/sliders/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete slider' });
  }
});

// 👉 Serve static (if using non-DB images)
app.get('/api/static-sliders', (req, res) => {
  const sliderDir = path.join(__dirname, 'public/sliders');
  fs.readdir(sliderDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read slider images' });
    }
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    const urls = imageFiles.map(file => `http://localhost:${PORT}/sliders/${file}`);
    res.json(urls);
  });
});

// ===================== START SERVER =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
