import Comment from '../models/comment';

const post = {
  all: async ctx => ctx.body = await Comment.all(),
  post: async ctx => ctx.body = await new Comment(ctx.request.body).save(),
  get: async ctx => ctx.body = await Comment.findById(ctx.params.id).select('-__v'),
  put: async ctx => ctx.body = await Comment.findByIdAndUpdate(ctx.params.id, ctx.request.body),
  delete: async ctx => ctx.body = await Comment.findByIdAndRemove(ctx.params.id),
};

export default post;
