import React, { PropTypes } from 'react';

// Author component contain link to the comment author url
const Author = props => (
  <a href={props.link}>props.author</a>
);

Author.propTypes = {
  link: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Author;
