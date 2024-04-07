import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

export default User;
