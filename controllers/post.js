import Post from '../models/post';

const post = {
  all: async ctx => ctx.body = await Post.all(),
  post: async ctx => ctx.body = await new Post(ctx.request.body).save(),
  get: async ctx => ctx.body = await Post.findById(ctx.params.id).select('-__v'),
  put: async ctx => ctx.body = await Post.findByIdAndUpdate(ctx.params.id, ctx.request.body),
  delete: async ctx => ctx.body = await Post.findByIdAndRemove(ctx.params.id),
};

export default post;
