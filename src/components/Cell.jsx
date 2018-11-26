import React, { Component } from 'react';

import Square from './Square';

class Cell extends Component {
  constructor(props){
    super(props);

    this.onDiscover = this.onDiscover.bind(this);
    this.onMineFlag = this.onMineFlag.bind(this);
  }

  onDiscover(e) {
    e.preventDefault();

    this.props.onCellDiscover(this.props.coords);
  }

  onMineFlag(e) {
    e.preventDefault();

    this.props.onCellFlag(this.props.coords);
  }

  render() {
    return (
      <Square 
        num={this.props.num}
        key={this.props.uuid} 
        hasMine={this.props.hasMine}
        hasNum={this.props.hasNum}
        flagged={this.props.flagged}
        boomed={this.props.isDefeatCause} 
        discovered={this.props.discovered} 
        onClick={this.onDiscover} 
        onContextMenu={this.onMineFlag}>
      </Square>
    );
  }
}

export default Cell;