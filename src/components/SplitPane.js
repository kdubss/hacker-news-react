import React from 'react';

const SplitPane = props => {
  console.log(props);
  return (
    <div>
      <div>
        { props.left }
      </div>
      <div>
        { props.right }
      </div>
    </div>
  )
}

export default SplitPane;