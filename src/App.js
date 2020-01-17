import React from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    auuthor: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  };

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  /**
   * Dismiss an item based on the items 'objectID' property. 
   * @param {number} id 
   */
  onDismiss(id) {
    const newList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: newList });
  };

  render() {
    const { searchTerm, list } = this.state;
    const renderSearchbar = (
      <form>
        <input type="text" onChange={ this.onSearchChange } />
      </form>
    );

    const renderItems = list.filter(isSearched(searchTerm)).map(item =>
      <div key={ item.objectID }>
        <span>
          <a href={ item.url }>{ item.url }</a>
        </span>
        <span>{ item.author }</span>
        <span>{ item.num_comments }</span>
        <span>{ item.points }</span>
        <span>
          <button
            onClick={ () => this.onDismiss(item.objectID) }
            type="button"
          >
            Dismiss
          </button>
        </span>
      </div>
    );

    return (
      <div className="App">
        <span>Here's a Searchibar and a list of items!</span>
        { renderSearchbar }
        { renderItems }
      </div>
    );
  };
};

export default App;