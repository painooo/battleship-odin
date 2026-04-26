import Ship from './Ship.js';

function makeShipCopy(shipList) {
  const list = {};
  for (let ship in shipList) {
    let length = shipList[ship];
    list[ship] = new Ship(length);
  }
  return list;
}

function isWin(shipList) {
  let sunk = 0;
  for (const ship in shipList) {
    if (shipList[ship].isSunk) sunk += 1;
  }
  return Object.keys(shipList).length == sunk;
}

function placeRandom(shipList, board) {
  for (const ship in shipList) {
    let notPlaced = true;
    while (notPlaced) {
      let dir = Math.round(Math.random()) ? "HORIZONTAL" : "VERTICAL";
      let x = Math.round(Math.random() * 9);
      let y = Math.round(Math.random() * 9);
      notPlaced = !board.placeShip(dir, shipList[ship], {x, y});
    }
  }
  return shipList;
}

function attackRandom(board, onAttack) {
  let notPlaced = true;
  while (notPlaced) {
    let x = Math.round(Math.random() * 9);
    let y = Math.round(Math.random() * 9);
    if (!board.board[x][y].isHit) {
      notPlaced = false;
      board.hitCell({x, y});
      onAttack();
    }
  }
}

function renderBoard(board, onClick, isSelf) {
  const boardDOM = document.createElement("div");
  for (let x = 0; x <= board.length - 1; x++) {
    const row = board[x];
    const rowDOM = document.createElement("div");
    for (let y = 0; y <= row.length - 1; y++) {
      const cellDOM = document.createElement("button");
      const loc = {x, y};
      cellDOM != null ? cellDOM.onclick = () => onClick(loc) : null;
      cellDOM.classList.add("cell");
      if (board[x][y].isHit) cellDOM.classList.add("hit");
      if (board[x][y].ship != null) {
        if (isSelf || board[x][y].isHit) cellDOM.classList.add("ship");
        if (board[x][y].ship.isSunk) cellDOM.classList.add("sunk");
      }
      rowDOM.appendChild(cellDOM);
      rowDOM.classList.add("row");
    }
    boardDOM.appendChild(rowDOM);
  }
  boardDOM.classList.add("board");
  return boardDOM;
}
function render({playBoard, statBoard, onAttack, onBuild}, status, area, shipList = {}) {
  area.textContent = "";
  const onClick = status == "toBuild" ? 
  (loc) => {
    const dir = (document.querySelector(".dirSelection")).value;
    const index = (document.querySelector(".shipSelection")).dataset.ship
    if (!index) return false;

    const ship = shipList[index];
    onBuild(playBoard.placeShip(dir, ship, loc), index);
    render({playBoard, onBuild}, status, area, shipList); // We don't have a good way to refresh
  }
  :
  ({x, y}) => {
    if (!playBoard.board[x][y].isHit) {
      playBoard.hitCell({x,y});
      render({playBoard, statBoard, onAttack}, status, area);
      onAttack();
    }
  }
  if (status == "toAttack") {
    const statBoardDOM = renderBoard(statBoard.board, null, true);
    area.appendChild(statBoardDOM);
  }
  const playBoardDOM = renderBoard(playBoard.board, onClick, status == "toBuild");
  area.appendChild(playBoardDOM);
}
export { render, isWin, placeRandom, attackRandom, makeShipCopy };