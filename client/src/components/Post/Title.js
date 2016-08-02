import React, { PropTypes } from 'react';

// Title component contain a post title
const Title = props => (
  <div className="post-title">{props.title}</div>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
