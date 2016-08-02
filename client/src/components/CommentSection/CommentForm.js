import React from 'react';

// Post New Comment for current post
// { commentBody, author, postId }
// display if only user auth

const CommentForm = () => (
  <form action="">
    <label htmlFor="form-comment">Comment</label>
    <textarea id="form-comment" name="comment" cols="70" rows="10"></textarea>
  </form>
);

export default CommentForm;
