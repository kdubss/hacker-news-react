import React from 'react';

import FancyBorder from './FancyBorder';

const Dialog = props => {
  return (
    <FancyBorder color="darkblue">
      <h1 style={{ color: props.color }}>{ props.title }</h1>
      <p>{ props.message }</p>
      { props.children }
    </FancyBorder>
  );
};

export default Dialog;