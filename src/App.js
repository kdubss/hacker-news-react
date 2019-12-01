import React from 'react';

import FormExample from './components/FormExample';

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

const isSearched = searchTerm => {
  return item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChanges = this.onSearchChanges.bind(this);
  };

  renderFormExample() {
    return <FormExample />
  }

  renderList() {
    const {searchTerm, list} = this.state;

    return (
      <div className="App">
        <form>
          <input
            type="text"
            onChange={this.onSearchChanges}
            value={searchTerm}
          />
        </form>
        {list.filter(isSearched(searchTerm)).map(l =>
          <div key={l.objectID}>
            <ul style={{listStyle: "none"}}>
              <li>Title: <a href={l.url}>{l.title}</a></li>
              <li>Author: {l.author}</li>
              <li>No. Comments: {l.num_comments}</li>
              <li>Points: {l.points}</li>
              <li>
                {this.renderDismissButton(l)}
              </li>
            </ul>
            <hr />
          </div>
        )}
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
        {/* {this.renderList()} */}
        {this.renderFormExample()}
      </div>
    );
  };
}

export default App;
