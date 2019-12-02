import React from 'react';

class SearchBar extends React.Component {
  render() {
    const { value, onChange } = this.props;

    return (
      <div className="App">
        <form>
          <input
            type="text"
            value={ value }
            onChange={ onChange }
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;