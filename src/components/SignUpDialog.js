import React from 'react';

import Dialog from './Dialog';

class SignUpDialog extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      login: 'Login Here',
      username: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  };

  handleChange(event) {
    this.setState({ login: event.target.value });
  };

  handleSignUp(event) {
    alert('Success! You\'re all signed up now as ' + this.state.login);
  }

  render() {
    return (
      <Dialog
        title="SignUpDialog Component"
        message="Welcome to the SignUpDialog Component"
        color="red"
      >
        <input
          value={ this.state.login }
          onChange={ this.handleChange }
        />
        <button onClick={ this.handleSignUp }>
          Sign Up!
        </button>
      </Dialog>
    );
  };
};

export default SignUpDialog;