import React from 'react';

import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';

const fahrenheitToCelsius = fahrenheit => (fahrenheit - 32) * (5/9);
const celsiusToFahrenheit = celsius => (celsius * (9/5)) + 32;

const tryConvert = (temperature, converterFunc) => {
  const inputTemperature = parseFloat(temperature);

  if (Number.isNaN(inputTemperature)) {
    return '';
  };

  const output = converterFunc(inputTemperature);
  const roundedOutput = Math.round(output * 1000) / 1000;

  return roundedOutput.toString();
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c',
    };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  };

  handleCelsiusChange(temperature) {
    console.log(temperature);
    this.setState({ temperature: temperature, scale: 'c' });
  };

  handleFahrenheitChange(temperature) {
    this.setState({ temperature: temperature, scale: 'f' });
  }

  onChange(event) {
    this.setState({ temperature: event.target.value });
  };

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, fahrenheitToCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, celsiusToFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={ celsius }
          onTemperatureChange={ this.handleCelsiusChange }
        />
        <TemperatureInput
          scale="f"
          temperature={ fahrenheit }
          onTemperatureChange={ this.handleFahrenheitChange }
        />
        <BoilingVerdict
          temperatureC={ parseFloat(this.state.temperature) }
        />
      </div>
    );
  };
};

export default Calculator;