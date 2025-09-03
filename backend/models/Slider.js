// models/Slider.js
import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  altText: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

// Prevent OverwriteModelError
const Slider = mongoose.models.Slider || mongoose.model('Slider', sliderSchema);

export default Slider;
