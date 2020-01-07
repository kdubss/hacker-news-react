import React, { Component } from 'react';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SearchBar from '../SearchBar/SearchBar';
import Table from '../Table/Table';
import Button from '../Button/Button';
import Error from '../Error/Error';

import '../../App.css';
import WelcomeDialog from '../WelcomeDialog';
import SignUpDialog from '../SignUpDialog';

Enzyme.configure({ adapter: new Adapter() });

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '50';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';
// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      numResults: null,
      error: null,
    };

    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  };

  render() {
    return (
      <div>
        { this.renderSearch() }
      </div>
    );
  };

  renderSearch() {
    const { searchTerm, results, searchKey, error } = this.state;
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
        {
          error
            ? <Error err={ this.error } />
            : <Table
              list={ list }
              onDismiss={ this.onDismiss }
              searchKey={ this.state.searchKey }
            />
        }
        <div className="interactions">
          { this.renderMoreTopStoriesButton(searchKey, page) }
        </div>
      </div>
    );
  };

  renderCompositionInheritanceExample() {
    return (
      <SignUpDialog />
    );
  };

  renderMoreTopStoriesButton(searchTerm, page) {
    return (
      <Button onClick={ () => this.fetchSearchTopStories(searchTerm, page + 1) }>
        Show Next { DEFAULT_HPP }
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

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  /**
   * @param {result} result Response object from request to the Hacker News API
   */
  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
    this.setState({ numResults: this.state.results[searchKey].hits.length });
  };

  fetchSearchTopStories(searchTerm, page = 0) {
    axios(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + `${searchTerm}` + '&' + PARAM_PAGE + `${page}` + '&\
' + PARAM_HPP + DEFAULT_HPP)
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  }

  // Once component JSX is rendered on the client and visible to the user,
  // 'componentDidMount' is called.
  componentDidMount() {
    const { searchTerm } = this.state;

    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentDidCatch(error, info) {
    console.log('Error: ', error);
    console.log('Info: ', info);
  }
};

export default Home;
