import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    const welcomeMessage = (
      <h1>
        Welcome to React!
      </h1>
    );
    const welcomeBlurb = <p>Start your coding adventures, here!</p>
    return (
      <div className="App">
        <span>{ welcomeMessage }</span>
        { welcomeBlurb }
      </div>
    );
  };
};

export default App;