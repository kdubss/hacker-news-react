import React, { Component } from 'react';

import SearchBar from './SearchBar';
import Table from './Table';
import Button from './Button';

import '../App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '10';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      numResults: null,
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
    const { searchTerm, results, searchKey } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

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
        <Table
          list={ list }
          onDismiss={ this.onDismiss }
          searchKey={ this.state.searchKey }
        />
        <div className="interactions">
          { this.renderMoreTopStoriesButton(searchKey, page) }
        </div>
      </div>
    );
  };

  renderMoreTopStoriesButton(searchKey, page) {
    return (
      <Button onClick={ () => this.fetchSearchTopStories(searchKey, page + 1) }>
        Show Next { this.state.numResults }
      </Button>
    )
  }

  renderDismissButton(item, searchKey) {
    return (
      <button onClick={ () => this.onDismiss(item.objectID, searchKey) } type="button">
        Dismiss
      </button>
    );
  };

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey]
    const updatedHits = hits.filter(hit => isNotId(hit));

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      }
    });
  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  };

  onSearchSubmit(event) {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);

    console.log(this.state);
    event.preventDefault();
  };

  /**
   * @param {result} result Response object from request to the Hacker News API
   */
  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      }
    });

    console.log(this.state);
  };

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&\
${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => {
        this.setSearchTopStories(result);
        this.setState({ numResults: result.hits.length });
      })
      .catch(err => err);
  }

  // Once component JSX is rendered on the client and visible to the user,
  // 'componentDidMount' is called.
  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }
};

export default Home;