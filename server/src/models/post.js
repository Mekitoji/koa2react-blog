import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
  title: {
    required: true,
    type: String,
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
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment',
  }],
});

/**
 * find all post and populate with author and comment prop
 * @method all
 * @return {Promise.<Array|Error>} populated posts
 */
PostSchema.statics.all = function all() {
  return this.find({})
    .select('-__v')
    .populate('author comments', '-_id -__v -_post')
    .exec();
};

const Post = mongoose.model('Post', PostSchema);
export default Post;
