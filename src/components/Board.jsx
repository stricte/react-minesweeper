import React, { Component } from 'react';

import { Matrix, Coords } from '../Matrix';

import Cell from './Cell';
import BoardContainer from './BoardContainer';
import MatrixRow from './MatrixRow';
import ResetBtn from './ResetBtn';

class Board extends Component {
  constructor(props){
    super(props);

    this.state = this.init();

    this.onCellDiscover = this.onCellDiscover.bind(this);
    this.onCellFlag = this.onCellFlag.bind(this);
    this.onReset = this.onReset.bind(this);

    this.interval = null;
  }

  finished(){
    return (this.win() || this.defeat());
  }

  generateMatrix(){
    return new Matrix(this.props.size, this.minesCount());
  }

  minesCount() {
    return Math.ceil(0.0589 * Math.pow(Math.pow(this.props.size, 2), 1.1711));
  }

  init(){ 
    return {
      started: false,
      matrix: this.generateMatrix(),
      gameSecondsCount: 0
    };
  }

  startTimer(){
    if(!this.interval){
      this.interval = setInterval(() => {
        this.setState((prevState) => {
          return {gameSecondsCount: prevState.gameSecondsCount + 1};
        })
      }, 1000);
    }
  }

  stopTimer(){
    clearInterval(this.interval);
    this.interval = null;
  }

  defeat(){
    return this.state.matrix.discoveredMines.length > 0
  }

  win(){
    return (this.state.matrix.hasDiscoveredAllCells() && this.state.matrix.hasFlaggedAllMines());
  }

  onCellDiscover(coords){
    if(this.finished()) return;

    this.startTimer();
    this.setState({ started: true });
  
    this.state.matrix.onCellDiscover(coords);
    
    if(this.finished()) this.stopTimer();
  }

  onCellFlag(coords){
    if(this.finished()) return;
    
    this.startTimer();
    this.setState({ started: true });

    this.state.matrix.onCellFlag(coords);

    if(this.finished()) this.stopTimer();
  }

  onReset(){
    this.stopTimer();
    this.setState(this.init());
  }

  renderHeader() {
   return (
     <div style={{clear: 'both', marginTop: '10px', marginBottom: '10px', width: '90%'}}>
      <div><h4>React Minesweeper</h4></div>
      <div>
        <h4>          
        </h4>
      </div>
      <div style={{width: '100%'}}>
        <div style={{float: 'left'}}>
          Mines left: {this.state.matrix.minesLeft()}
        </div>
        <div style={{float: 'right'}}>
          Timer: {this.state.gameSecondsCount}
        </div>
      </div>
     </div>
   );
  }

  renderBoard(){
    return this.state.matrix.matrix.map((row, y) => {
      const cells = row.map((column, x) => {
        const coords = new Coords(x, y);

        const num = this.state.matrix.getOnCoords(coords);
        const hasMine = this.state.matrix.isMine(coords);
        const hasNum = this.state.matrix.isNum(coords);

        return (
          <Cell
            discovered={this.state.matrix.cellIsDiscovered(coords) || this.finished()}
            flagged={this.state.matrix.cellIsFlagged(coords)}
            uuid={coords.uuid()}
            key={coords.uuid()}
            coords={coords} 
            num={num}
            hasNum={hasNum}
            hasMine={hasMine} 
            isDefeatCause={this.state.matrix.cellIsDefeatCause(coords)}
            onCellDiscover={this.onCellDiscover} 
            onCellFlag={this.onCellFlag} />
        );
      });

      return (
        <MatrixRow key={y}>{cells}</MatrixRow>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <BoardContainer>
          {this.renderHeader()}
          {this.renderBoard()}
          <ResetBtn onClick={this.onReset}>{this.props.resetText}</ResetBtn>
        </BoardContainer>
      </React.Fragment>
    );
  }
}

export default Board;