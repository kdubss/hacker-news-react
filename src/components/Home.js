import React, { Component } from 'react';

import SearchBar from './SearchBar';
import Table from './Table';
import IncomingData from './IncomingData';

import '../App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  };

  render() {
    return (
      <div>
        { this.renderList() }
      </div>
    );
  };

  renderList() {
    const { searchTerm, result } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <SearchBar
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
            Search
          </SearchBar>
        </div>
        {
          result
            ?  <Table
                list={ result.hits }
                onDismiss={ this.onDismiss }
              />
            : <IncomingData />
        }
      </div>
    );
  };

  renderDismissButton(item) {
    return (
      <button onClick={ () => this.onDismiss(item.objectID) } type="button">
        Dismiss
      </button>
    );
  };

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  setSearchTopStories(result) {
    this.setState({ result });
  };

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => {
        this.setSearchTopStories(result);
      })
      .catch(err => err);
  }

  // Once component JSX is rendered on the client and visible to the user,
  // 'componentDidMount' is called.
  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
};

export default Home;