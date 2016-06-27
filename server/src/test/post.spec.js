import User from '../models/user';
import Post from '../models/post';
import Comment from '../models/comment';
import { expect } from 'chai';

// helpers
const commentValidation = c => {
  expect(c._id).to.not.exist;
  expect(c.__v).to.not.exist;
  expect(c._post).to.not.exist;
};

const postValidation = p => {
  expect(p.__v).to.not.exist;
  expect(p.author.__v).to.not.exist;
  expect(p.author._id).to.not.exist;
  p.comments.forEach(commentValidation);
};

describe('Post', () => {
  const user = { mail: 'wonderwoman@themyscira.com', role: 'user', password: 'Steve' };
  const posts = [
    { title: 'Cat', body: 'Lorem ipsum dolor sit amet' },
    { title: 'Dog', body: 'Lorem ipsum dolor sit amet' },
    { title: 'Owl', body: 'Lorem ipsum dolor sit amet' },
  ];

  const comments = { body: 'Lorem' };

  before(async () => {
    const u = await User.create(user);
    const { id } = u;
    posts.forEach(async p => {
      const post = await Post.create(Object.assign({}, p, { author: id }));
      await Comment.create(
        Object.assign({}, comments, { author: id, _post: post.id })); // pre save hook in work
    });
  });

  after(async () => {
    await User.remove({});
    await Post.remove({});
    await Comment.remove({});
  });

  describe('#all', () => {
    it('expect array with length 3', async () => {
      const allPost = await Post.all();
      expect(allPost).to.be.an('array').with.length(3);
    });

    it('expect private fields be unselected', async () => {
      const allPost = await Post.all();
      allPost.forEach(postValidation); // sync
    });
  });
});
