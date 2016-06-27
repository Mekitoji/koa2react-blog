import Comment from '../models/comment';
import User from '../models/user';
import Post from '../models/post';
import { expect } from 'chai';

describe('Comment', () => {
  const user = { mail: 'superman@dailyplanet.com', role: 'user', password: 'Lois' };
  const post = { title: 'Owl', body: 'Lorem ipsum dolor sit amet' };

  const comments = [
    { body: 'First' },
    { body: 'lol' },
    { body: 'hohohooho' },
  ];

  before(async () => {
    const u = await User.create(user);
    const { id } = u;
    const p = await Post.create(Object.assign({}, post, { author: id }));
    await comments.forEach(async c => {
      await Comment.create(
        Object.assign({}, c, { author: id, _post: p.id })); // pre save hook at work
    });
  });

  after(async () => {
    await User.remove({});
    await Post.remove({});
    await Comment.remove({});
  });

  describe('#all', () => {
    it('expect pre save hook push comment into Post', async () => {
      const p = await Post.find();
      expect(p).to.be.an('array');
    });

    it('expect version key and id be unselected in populated author', async () => {
      const comment = await Comment.all();

      /* eslint-disable no-unused-expressions */
      comment.forEach(c => {
        expect(c._v).to.not.exist;
      });

      comment.forEach(c => {
        expect(c.author._id).to.not.exist;
        expect(c.author.__v).to.not.exist;
      });
      /* eslint-enable no-unused-expressions */
    });
  });
});
