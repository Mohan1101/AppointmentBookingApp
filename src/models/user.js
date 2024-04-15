import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  allowedusers: {
    type: [String],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
