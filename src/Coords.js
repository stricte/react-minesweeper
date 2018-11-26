class Coords {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  uuid(){
    return parseInt(`1${this.x}${this.y}`);
  }

  isValid(size){
    if(this.x < 0) return false;
    if(this.y < 0) return false;

    if(this.x >= size) return false;
    if(this.y >= size) return false;

    return true;
  }

  directions(){
    return ['UP', 'DOWN', 'LEFT', 'RIGHT', 'UP_RIGHT', 'UP_LEFT', 'DOWN_LEFT', 'DOWN_RIGHT'];
  }

  designateNeighbours(){
    return this.directions().map((direction) => {
      return this.move(direction);
    });
  }

  move(direction){
    switch(direction){
      case 'UP':
      return new Coords(this.x, this.y - 1);
      case 'DOWN':
      return new Coords(this.x, this.y + 1);
      case 'LEFT':
      return new Coords(this.x - 1, this.y);
      case 'RIGHT':
      return new Coords(this.x + 1, this.y);
      case 'UP_RIGHT':
      return new Coords(this.x + 1, this.y - 1);
      case 'UP_LEFT':
      return new Coords(this.x - 1, this.y - 1);
      case 'DOWN_LEFT':
      return new Coords(this.x - 1, this.y + 1);
      case 'DOWN_RIGHT':
      return new Coords(this.x + 1, this.y + 1);
      // no default
    }
  }
}

export default Coords;