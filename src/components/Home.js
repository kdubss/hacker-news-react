import React from 'react';

import list from '../data/example-list';
import SearchBar from './SearchBar';
import Table from './Table';

import '../App.css';

class Home extends React.Component {
  constructor(props) {
    console.log('calling constructor');
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  };

  UNSAFE_componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component mounted!');
  }

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
};

export default Home;