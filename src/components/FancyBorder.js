import React from 'react';

const FancyBorder = props => {
  return (
    <div style={{ color: props.color }}>
      { props.children }
    </div>
  );
};

export default FancyBorder;