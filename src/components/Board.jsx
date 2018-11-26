import React, { Component } from 'react';

import { Matrix, Coords } from '../Matrix';

import Cell from './Cell';
import Container from './Container';
import Row from './Row';
import ResetBtn from './ResetBtn';

class Board extends Component {
  constructor(props){
    super(props);

    this.state = this.init();

    this.onCellDiscover = this.onCellDiscover.bind(this);
    this.onCellFlag = this.onCellFlag.bind(this);
    this.onReset = this.onReset.bind(this);
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
      matrix: this.generateMatrix()
    };
  }

  defeat(){
    return this.state.matrix.discoveredMines.length > 0
  }

  win(){
    return (this.state.matrix.hasDiscoveredAllCells() && this.state.matrix.hasFlaggedAllMines());
  }

  onCellDiscover(coords){
    if(this.finished()) return;

    this.setState({ started: true });

    this.state.matrix.onCellDiscover(coords);
  }

  onCellFlag(coords){
    if(this.finished()) return;
    
    this.setState({ started: true });

    this.state.matrix.onCellFlag(coords);
  }

  onReset(){
    this.setState(this.init());
  }

  renderHeader() {
    if(this.win()) return <h4 style={{color: 'green'}}>{this.props.winText}</h4>;
    if(this.defeat()) return <h4 style={{color: 'red'}}>{this.props.defeatText}</h4>
    if(!this.state.started) return <h4>{this.props.beforeStartText}</h4>
    return <h4>{this.state.matrix.minesLeft()}</h4>;
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
        <Row key={y}>{cells}</Row>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          {this.renderHeader()}
          {this.renderBoard()}
          <ResetBtn onClick={this.onReset}>{this.props.resetText}</ResetBtn>
        </Container>
      </React.Fragment>
    );
  }
}

export default Board;