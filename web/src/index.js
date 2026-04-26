import "./styles.css";
import Board from './Board.js';
import Ship from './Ship.js';
import BuildMode from './BuildMode.js';
import AttackMode from './AttackMode.js';
import { placeRandom, makeShipCopy } from './util.js';

const globalShipList = {"Carrier": 5, "Battleship": 4, "Cruiser": 3, "Submarine": 3, "Destroyer": 2};

const boardTwo = new Board();
const playerTwoShips = placeRandom(makeShipCopy(globalShipList), boardTwo);

const boardOne = new Board();
const onSubmit = (playerOneShips) => {
  AttackMode([boardOne, playerOneShips], [boardTwo, playerTwoShips]);
}
const playerOneShips = BuildMode(makeShipCopy(globalShipList),  boardOne, onSubmit);