import express from 'express';
import Slider from '../models/Slider.js';
// import restrictByIP from '../middlewares/restrictByIp.js'; // middleware import karo

const router = express.Router();

// Middleware ko router pe laga do (poore slider routes ke liye)
// router.use(restrictByIP);

// Get all sliders
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find().sort('order');
    res.json(sliders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new slider
router.post('/', async (req, res) => {
  const { imageUrl, altText, order } = req.body;

  if (!imageUrl) return res.status(400).json({ message: 'Image URL required' });

  const slider = new Slider({ imageUrl, altText, order });
  try {
    const saved = await slider.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update slider
router.put('/:id', async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ message: 'Slider not found' });

    slider.imageUrl = req.body.imageUrl || slider.imageUrl;
    slider.altText = req.body.altText || slider.altText;
    slider.order = req.body.order || slider.order;

    const updated = await slider.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete slider
router.delete('/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slider deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
