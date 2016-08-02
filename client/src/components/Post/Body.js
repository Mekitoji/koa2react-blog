import React, { PropTypes } from 'react';

// Body component contain post body
const Body = props => (
  <div id="post-body">{props.text}</div>
);

Body.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Body;
