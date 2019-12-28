import React from 'react';

import PropTypes from 'prop-types';

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  children,
}) =>
  <form onSubmit={ onSubmit }>
    <input
      type="text"
      value={ value }
      onChange={ onChange }
    />
    <button type="submit">
      { children }
    </button>
  </form>

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default SearchBar;