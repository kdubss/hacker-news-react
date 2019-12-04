import React from 'react';

import FancyBorder from './FancyBorder';

const Dialog = props => {
  return (
    <FancyBorder color="darkblue">
      <h1>{ props.title }</h1>
      <p>{ props.message }</p>
    </FancyBorder>
  );
};

export default Dialog;