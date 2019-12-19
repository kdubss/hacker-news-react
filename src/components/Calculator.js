import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temperature: '',
    }
  };

  render() {
    const temperature = this.state.temperature;

    return (
      <div>
        The temperature is { temperature }
      </div>
    );
  };
};

export default Calculator;