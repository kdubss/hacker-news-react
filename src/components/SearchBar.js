import React from 'react';

class SearchBar extends React.Component {
  render() {
    const { value, onChange, children } = this.props;

    return (
      <div className="App">
        <form>
          { children } <input
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