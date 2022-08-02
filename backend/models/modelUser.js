import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_name: { type: String, required: true },
    user_tag: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
