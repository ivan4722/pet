import mongoose from 'mongoose';
const { Schema } = mongoose;

const petSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  hunger: { type: Number, default: 5, min: 1, max: 10 },
  lastPlayed: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
