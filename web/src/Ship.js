export default class Ship {
  constructor(length) {
    this.isSunk = false;
    this.hits = 0;
    this.length = length;
  }
  hit() {
    this.hits += 1;
    if (this.hits >= this.length) this.isSunk = true;
  }
}