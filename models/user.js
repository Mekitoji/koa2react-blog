import mongoose from '../lib/mongoose';
const Schema = mongoose.Schema;

// TODO: hash password
const UserSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
