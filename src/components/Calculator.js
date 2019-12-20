import React from 'react';

import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';

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
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
        <BoilingVerdict
          temperatureC={ parseFloat(this.state.temperature) }
        />
      </div>
    );
  };

  onChange(event) {
    this.setState({ temperature: event.target.value });
  };
};

export default Calculator;