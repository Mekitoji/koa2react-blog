import React, { PropTypes } from 'react';
import Author from './Author';

// Info component contain information about date and athor of a comment
const Info = props => (
  <div>
    <p><Author author={props.author} link={props.link} /> {props.Date}</p>
  </div>
);

Info.propTypes = {
  User: PropTypes.shape({
    author: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  Date: PropTypes.string.isRequired,
};

export default Info;
