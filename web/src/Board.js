export default class Board {
  constructor() {
    this.board = this.newBoard();
  }
  newBoard() {
    const board = [];
    let length = 10;
    for (let i = 1; i <= length; i++) {
      let row = [];
      for (let j = 1; j <= length; j++) {
        row.push({isHit: false, ship: null});
      }
      board.push(row);
    }
    return board;
  }
  placeShip(direction, ship, {x, y}) {
    let length = ship.length;
    if (x < 0 || y < 0 || x > 9 || y > 9) {
      return false; // Very pretty I know
    } // I do not know any better way of doing this
    // perhaps a util. function might help
    if (direction == "HORIZONTAL") {
      if (x + length > 9) return false;
      for (let i = x; i < x + length; i++) { // Entire area gets checked first
        if (this.board[i][y].ship != null) return false;
      }
      for (let i = x; i < x + length; i++) { // Then ship is placed
        this.board[i][y].ship = ship;
      }
    } else {
      if (y + length > 9) return false;
      for (let i = y; i < y + length; i++) { // Entire area gets checked first
        if (this.board[x][i].ship != null) return false;
      }
      for (let i = y; i < y + length; i++) { // Then ship is placed
        this.board[x][i].ship = ship;
      }
    }
    return true;
  }
  hitCell({x, y}) {
    let cell = this.board[x][y];
    if (!cell.isHit) {
      cell.isHit = true;
      if (cell.ship != null) cell.ship.hit();
    }
  }
}