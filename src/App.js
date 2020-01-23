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

    return (
      <div className="App">
				<Search
					value={ searchTerm }
					onChange={ this.onSearchChange }
				>
          Search
        </Search>
				<Table
					list={ list }
					pattern={ searchTerm }
					onDismiss={ this.onDismiss }
				/>
      </div>
    );
  };
};

const Search = props => {
  const { value, onChange, children } = props;

  return (
    <form>
      { children }
      <input
        type="text"
        value={ value }
        onChange={ onChange }
      />
    </form>
  );
};

class Table extends React.Component {
	render() {
    const { list, pattern, onDismiss } = this.props;

		return (
      <div>
        {
          list.filter(isSearched(pattern)).map(item =>
            <div key={ item.objectID }>
              <span>
                <a href={ item.url }>{ item.url }</a>
              </span>
              <span>{ item.author }</span>
              <span>{ item.num_comments }</span>
              <span>{ item.points }</span>
              <span>
                <Button
                  onClick={ () => onDismiss(item.objectID) }
                >
                  Dismiss
                </Button>
              </span>
            </div>
          )
        }
      </div>
		);
	};
};

class Button extends React.Component {
  render() {
    const { onClick, className = '', children } = this.props;

    return (
      <button
        className={ className }
        type="button"
        onClick={ onClick }
      >
        { children }
      </button>
    )
  }
}

export default App;
