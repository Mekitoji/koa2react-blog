import mongoose from 'mongoose';
import Post from './post';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  _post: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  },
});

/**
 * get all comments populated with authors
 * @method all
 * @return {Promise} result
 */
CommentSchema.statics.all = function all() {
  return this.find({})
    .select('-__v')
    .populate('author', '-_id -__v')
    .exec();
};

CommentSchema.pre('save', async function preSave(next) {
  if (!this.isNew) return next();
  try {
    await Post.findByIdAndUpdate(this._post, { $push: { comments: this._id } });
  } catch (e) {
    return next(e);
  }
  return next();
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
