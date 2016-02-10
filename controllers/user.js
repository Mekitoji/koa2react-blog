import User from '../models/user';

const user = {
  all: async ctx => ctx.body = await User.find({}),
  get: async ctx => ctx.body = await User.findById(ctx.params.id),
  post: async ctx => ctx.body = await new User(ctx.request.body).save(),
  put: async ctx => ctx.body = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body),
  delete: async ctx => ctx.body = await User.findByIdAndRemove(ctx.params.id),
};

export default user;
