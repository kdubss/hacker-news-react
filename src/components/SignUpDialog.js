import React from 'react';
import Dialog from './Dialog';

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  };
  handleChange(e) {
    this.setState({ login: e.target.value });
  }
  handleSignUp() {
    const { login } = this.state;
    alert(`Welcome aboard ${login}!`)
  }
  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input value={ this.state.login } onChange={ this.handleChange } />
        <button onClick={ this.handleSignUp }>
          Sign me up!
        </button>
      </Dialog>
    );
  };
};

export default SignUpDialog;