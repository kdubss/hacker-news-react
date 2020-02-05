import React from 'react';

const Button = ({ onClick, className, children }) =>
  <button
    type="button"
    onClick={ () => onClick() }
  >
    { children }
  </button>

export default Button;