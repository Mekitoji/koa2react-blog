import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true,
  },
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
});

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

const month = CommentSchema.virtual('date.month');
month.get(function getMonth() {
  return months[this.date.month];
});
month.set(function setMonth(m) {
  this.date.month = months.indexOf(m);
  return this.date.month;
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
