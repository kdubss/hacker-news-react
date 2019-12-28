import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar';

it('SearchBar component renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<SearchBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
