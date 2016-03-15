import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const SALT_FACTOR = 10;

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
}, {
  versionKey: false,
});


UserSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) return next();
  return bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      return next();
    });
  });
});

/**
 * compare password of current user
 * @method comparePassword
 * @param  {String}                     candidate password to compare
 * @return {Promise.<boolean|Error>}    if match return true/false
 */
UserSchema.methods.comparePassword = function (candidate) {
  return new Promise((resolve, reject) =>
    User.findById(this._id).select('+password').exec()
    .then(data => {
      bcrypt.compare(candidate, data.password, (err, isMatch) => {
        if (err) return reject(err);
        return resolve(isMatch);
      });
    })
    .catch(err => reject(err))
  );
};

const User = mongoose.model('User', UserSchema);
export default User;
