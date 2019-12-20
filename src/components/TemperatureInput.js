import React from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
    };

    this.handleChange = this.handleChange.bind(this);
  };

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    console.log('props: ', this.props);

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

  handleChange(event) {
    console.log(event);
    this.setState({ temperature: event.target.value });
  }
};

export default TemperatureInput;