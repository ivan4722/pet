
import mongoose from 'mongoose';
const { Schema } = mongoose;

const petSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, 
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
