import React from 'react';
import FancyBorder from './FancyBorder';

const Dialog = props => {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        { props.title }
      </h1>
      <p className="Dialog-message">
        { props.message }
      </p>
    </FancyBorder>
  );
};

export default Dialog