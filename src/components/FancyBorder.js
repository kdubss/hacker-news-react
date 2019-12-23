import React from 'react';

const FancyBorder = props => {
  console.log(props);
  return (
    <div className={ "FancyBorder FancyBorder-" + props.color }>
      { props.children }
    </div>
  );
};

export default FancyBorder;