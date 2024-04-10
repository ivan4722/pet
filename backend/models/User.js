import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }], 
});

const User = mongoose.model('PetUser', userSchema);

export default User;
