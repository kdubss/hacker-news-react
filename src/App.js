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

class App extends React.Component {
  render() {
    const listItems = list.map(item => {
      return (
        <div>
          { item.title }
        </div>
      );
    });
    
    return (
      <div className="App">
        <span>Here's a list of items!</span>
        { listItems }
      </div>
    );
  };
};

export default App;