import Coords from './Coords';

class Matrix {
  constructor(size, minesCount){
    this.size = size;
    this.minesCount = minesCount;

    this.generate();
  }

  generate(){
    this.placedMines = [];
    this.discoveredCells = [];
    this.flaggedCells = [];
    this.discoveredMines = [];

    this.init();
    this.placeMines();
  }

  init(){
    this.matrix = new Array(this.size).fill(0).map(row => new Array(this.size).fill(0));
  }

  placeMines(){
    this.placedMines = [];

    for(let i = 1; i <= this.minesCount; i++ ){
      let mine = this.randomCoords();

      while(this.placedMines.includes(mine.uuid())){
        mine = this.randomCoords();
      }

      this.setOnCoords(mine, 9);
      this.placedMines.push(mine.uuid());

      this.updateMineNeighbours(mine);
    }
  }

  setOnCoords(coords, num){
    this.matrix[coords.x][coords.y] = num;
  }

  getOnCoords(coords){
    return this.matrix[coords.x][coords.y];
  }

  findNeighboursFor(coords){
    const dirtyNeighbours = coords.designateNeighbours();

    return dirtyNeighbours.filter((neighbour) => {
      return neighbour.isValid(this.size);
    });
  }

  isMine(coords){
    return (this.getOnCoords(coords) === 9);
  }

  isNum(coords){
    return (this.getOnCoords(coords) > 0 && this.getOnCoords(coords) < 9);
  }

  isEmpty(coords){
    return (this.getOnCoords(coords) === 0);
  }

  isValid(coords){
    return coords.isValid(this.size);
  }

  updateMineNeighbours(mine){
    const neighbours = this.findNeighboursFor(mine);

    neighbours.forEach((neighbour) => {
      if(this.isMine(neighbour)){
        return;
      }

      this.setOnCoords(neighbour, this.getOnCoords(neighbour) + 1);
    });
  }

  cellIsDiscovered(coords){
    return this.discoveredCells.find((discovered) => {
      return discovered.uuid() === coords.uuid();
    });
  }

  cellIsFlagged(coords){
    return this.flaggedCells.find((flagged) => {
      return flagged.uuid() === coords.uuid();
    });
  }

  cellIsDefeatCause(coords){
    return this.discoveredMines.find((discovered) => {
      return discovered.uuid() === coords.uuid();
    });
  }

  markDiscovered(coords){
    this.discoveredCells.push(coords);
  }

  markFlagged(coords, status){
    if(status){
      this.flaggedCells = [...this.flaggedCells, coords];
    }
    else {
      this.flaggedCells = this.flaggedCells.filter((f) => {
        return f.uuid() !== coords.uuid();
      })
    }
  }

  onCellDiscover(coords){
    if(!this.isValid(coords)) return;

    if(this.cellIsDiscovered(coords)) return;
    if(this.cellIsFlagged(coords)) return;
    
    if(this.isMine(coords)) {
      this.discoveredMines = [...this.discoveredMines, coords];

      return;
    }

    if(this.isNum(coords)){
      this.markDiscovered(coords);
      
      return;
    }
    
    if(this.isEmpty(coords)){
      this.markDiscovered(coords);

      const neighbours = this.findNeighboursFor(coords);
      neighbours.forEach((neighbour) => this.onCellDiscover(neighbour));
    }
  }

  onCellFlag(coords){
    if(!this.isValid(coords)) return;
    if(this.cellIsDiscovered(coords)) return;

    this.markFlagged(coords, !this.cellIsFlagged(coords));
  }

  hasDiscoveredAllCells(){
    return ((Math.pow(this.size, 2) - this.placedMines.length) === this.discoveredCells.length);
  }

  flaggedMinesCount(){
    return this.flaggedCells
               .filter((flagged) => this.isMine(flagged));
  }

  hasFlaggedAllMines(){ 
    return this.flaggedMinesCount().length === this.minesCount;
  }

  minesLeft(){
    return (this.minesCount - this.flaggedCells.length);
  }

  randomCoords(){
    return new Coords(this.random(), this.random());
  }

  random(){
    const min = 0
    const max = this.size;
    
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export { Matrix, Coords };