import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true },
    user_name: { type: String, required: true },
    token: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
