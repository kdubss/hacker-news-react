import React from 'react';

import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Table from './components/Table';

import './App.css'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
      isGoing: true,
      numberOfGuests: 2,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChanges = this.onSearchChanges.bind(this);
  };

  renderList() {
    const {searchTerm, list} = this.state;

    return (
      <div className="page">
        <Navbar />
        <div className="interactions">
          <SearchBar
            value={ searchTerm }
            onChange={ this.onSearchChanges }
          >
            Search
          </SearchBar>
        </div>
          <Table
            list={ list }
            pattern={ searchTerm }
            onDismiss={ this.onDismiss }
          />
      </div>
    );
  };

  renderDismissButton(item) {
    return (
      <button onClick={() => this.onDismiss(item.objectID)} type="button">
        Dismiss
      </button>
    );
  };

  onSearchChanges(e) {
    this.setState({ searchTerm: e.target.value });
  };

  onDismiss(id) {
    const updated_list = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updated_list });
  };

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  };
};

export default App;
