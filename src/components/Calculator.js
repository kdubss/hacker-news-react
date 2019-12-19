import React from 'react';

import BoilingVerdict from './BoilingVerdict';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
    };

    this.onChange = this.onChange.bind(this);
  };

  render() {
    const temperature = this.state.temperature;

    return (
      <div>
        <fieldset>
          <legend>Enter temperature in Celsius</legend>
          <input
            placeholder="Temperature"
            value={ temperature }
            onChange={ this.onChange }
          />
        </fieldset>
        <BoilingVerdict temperature={ this.state.temperature } />
      </div>
    );
  };

  onChange(event) {
    this.setState({ temperature: event.target.value });
  };
};

export default Calculator;