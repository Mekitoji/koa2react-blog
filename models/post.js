import mongoose from '../lib/mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    day: {
      type: Number,
      required: true,
    },
    monthNumber: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  comments: {
    type: Schema.ObjectId,
    ref: 'Comment',
  },
});

PostSchema.statics.all = function getAll() {
  return this.find({}).populate('User').populate('Comment');
};

const months = ['January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'];

const month = PostSchema.virtual('date.month');
month.get(function getMonth() {
  return months[this.date.month];
});
month.set(function setMonth(m) {
  this.date.month = months.indexOf(m);
  return this.date.month;
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
