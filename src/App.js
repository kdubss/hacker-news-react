import React from 'react';

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list
    }
    this.onDismiss = this.onDismiss.bind(this);
  };

  renderList() {
    return (
      <div>
        {this.state.list.map(l =>
          <div key={l.objectID}>
            <ul style={{listStyle: "none"}}>
              <li>Title: <a href={l.url}>{l.title}</a></li>
              <li>Author: {l.author}</li>
              <li>No. Comments: {l.num_comments}</li>
              <li>Points: {l.points}</li>
              <li>
                <button
                  onClick={() => this.onDismiss(l.objectID)}
                  type="button"
                >
                  Dismiss
                </button>
              </li>
            </ul>
            <hr />
          </div>
        )}
      </div>
    );
  };

  onDismiss(id) {
    const updated_list = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updated_list });
  };

  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    );
  };
}

export default App;
