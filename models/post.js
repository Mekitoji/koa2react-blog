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
}, {
  versionKey: false,
});

PostSchema.statics.all = function getAll() {
  return this.find({}).populate('author comments').exec();
};

const Post = mongoose.model('Post', PostSchema);
export default Post;
