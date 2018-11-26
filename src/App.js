import React, { Component } from 'react';
import './App.css';

import Board from './components/Board';

class App extends Component {
  static defaultProps = {
    size: 5,
    beforeStartText: 'Start when you are ready',
    winText: 'You won!',
    defeatText: 'You lost!',
    resetText: 'Reset'
  }

  render() {
    return( 
      <React.Fragment>
        <Board {...this.props} />
      </React.Fragment>
    );
  }
}

export default App;
