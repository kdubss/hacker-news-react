import React from 'react';
import './App.css';

const DEFAULT_QUERY = 'Redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
  };

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);  
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  };

  /**
   * Dismiss an item based on the items 'objectID' property. 
   * @param {number} id 
   */
  onDismiss(id) {
    const { result } = this.state;
    const updatedHits = result.hits.filter(item => item.objectID !== id);
    this.setState({ 
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  render() {
    const { searchTerm, result } = this.state;

    if (!result) { return null }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={ searchTerm }
            onChange={ this.onSearchChange }
          >
            Search
          </Search>
        </div>
				<Table
					list={ result.hits }
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

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {
      list.filter(isSearched(pattern)).map(item =>
        <div key={ item.objectID } className="table-row">
          <span style={{ width: '40%' }}>
            <a href={ item.url }>{ item.url }</a>
          </span>
          <span style={{ width: '30%' }}>{ item.author }</span>
          <span style={{ width: '10%' }}>{ item.num_comments }</span>
          <span style={{ width: '10%' }}>{ item.points }</span>
          <span style={{ width: '10%' }}>
            <Button
              onClick={ () => onDismiss(item.objectID) }
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )
    }
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    type="button" 
    onClick={ onClick }
    className={ className }
  >
    { children }
  </button>

export default App;
