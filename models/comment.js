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

CommentSchema.statics.all = function getAll() {
  return this
    .find({})
    .populate('author')
    .exec();
};

CommentSchema.pre('save', function save(next) {
  Post.findByIdAndUpdate(this._post, { $push: { comments: this._id } })
  .exec()
  .then(() => next());
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
