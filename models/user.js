import mongoose from '../lib/mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
});

const User = mongoose.model('User', UserSchema);
export default User;
