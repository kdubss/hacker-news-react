import React from 'react';
import './App.css';
import axios from 'axios';

import Button from './components/Button/Button';
import Search from './components/Search/Search';
import Table from './components/Table/Table';

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from './constants/constants';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  };

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits }
      }
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state; 

    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    };
    
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  };

  /**
   * Dismiss an item based on the items 'objectID' property. 
   * @param {number} id 
   */
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits } = results[searchKey]

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    
    this.setState({
      results: {
        [searchKey]: { hits: updatedHits }
      }
    });
  };

  render() {
    const { 
      searchTerm,
      results,
      searchKey,
      error,
    } = this.state;

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
          <Search
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
            Search
          </Search>
        </div>
        { error
          ? <div className="interactions">
              <p>Something went wrong...</p>
            </div>
          : <Table
              tableStyle="table"
              tableRowStyle="table-row"
              list={ list }
              onDismiss={ this.onDismiss }
            />
        }
        <div className="interactions">
          <Button onClick={ () => this.fetchSearchTopStories(searchKey, page + 1) }>
            More Hits!
          </Button>
        </div>
      </div>
    );
  };
};

export default App;
