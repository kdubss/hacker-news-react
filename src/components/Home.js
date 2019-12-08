import React, { Component } from 'react';

import list from '../data/example-list';
import SearchBar from './SearchBar';
import Table from './Table';

import '../App.css';

const DEFAULT_QUERY = 'react';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: DEFAULT_QUERY,
      result: null,
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  };

  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    );
  };

  renderList() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <SearchBar
            value={ searchTerm }
            onChange={ this.onSearchChange }
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
      <button onClick={ () => this.onDismiss(item.objectId) } type="button">
        Dismiss
      </button>
    );
  };

  onDismiss(id) {
    const updated_list = this.state.list.filter(item => item.objectId !== id);
    this.setState({ list: updated_list });
  };

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value });
  };

  setSearchTopStories(result) {
    this.setState({ result });
  };

  // Once component JSX is rendered on the client and visible to the user,
  // 'componentDidMount' is called.
  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }
};

export default Home;