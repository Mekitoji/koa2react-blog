import React, { PropTypes } from 'react';

// CommentBody is just a comment body..
// TODO: Add some style
const CommentBody = props => (
  <div>
    {props.text}
  </div>
);

CommentBody.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CommentBody;
