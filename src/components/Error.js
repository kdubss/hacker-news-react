import React from 'react';

const Error = ({ err }) =>
  <div>
    <p>Something went wrong...</p>
    <p>Error: { err }</p>
  </div>

export default Error;