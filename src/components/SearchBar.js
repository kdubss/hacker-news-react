import React from 'react';

const SearchBar = ({ value, onChange, children }) =>
  <form>
    { children } <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
  </form>

export default SearchBar;