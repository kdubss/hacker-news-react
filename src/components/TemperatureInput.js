import React from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event) {
    this.props.onTemperatureChange(event.target.value);
  };

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <div>
        <fieldset>
          <legend>Enter temperature in { scaleNames[scale] }:</legend>
          <input
            value={ temperature }
            onChange={ this.handleChange }
          />
        </fieldset>
      </div>
    );
  };
};

export default TemperatureInput;