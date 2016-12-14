import mongoose from 'mongoose';

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  email: {
    type: String,
    match: emailRegexp,
  },
}, options);

export const User = mongoose.model('User', userSchema);
