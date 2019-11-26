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

function App() {
  const news = list.map(l => {
    return (
      <div>
        <div>
          <li><a href={l.url}>Title: {l.title}</a></li>
          <li>Author: {l.author}</li>
          <li>No. Comments: {l.num_comments}</li>
          <li>Points: {l.points}</li>
          <li>ObjectID: {l.objectID}</li>
        </div>
        <hr />
      </div>
    );
  });

  return (
    <div className="App">
      <ul style={{listStyle: 'none'}}>
        {news}
      </ul>
    </div>
  );
}

export default App;
