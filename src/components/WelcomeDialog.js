import React from 'react';
import FancyBorder from './FancyBorder';
import SplitPane from './SplitPane';

const WelcomeDialog = props =>
  <div>
    <FancyBorder color="blue">
      <h1>Welcome</h1>
      <p>Thank you for visiting our space-craft!</p>
    </FancyBorder>
    <SplitPane
      left={
        <div>
          <h2>This is the left!</h2>
        </div>
      }
      right={
        <div>
          <h2>This is the right!</h2>
        </div>
      }
    />
  </div>

export default WelcomeDialog;