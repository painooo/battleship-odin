import { render, isWin, attackRandom } from './util.js';

export default function AttackMode([ownBoard, playerOneShips], [otherBoard, playerTwoShips]) {
  document.body.textContent = "";
  let currentPlayer = false; // false = player, true = AI :)
  const onAttack = () => { // Bug: For some reason player gets a head start
    if (isWin(currentPlayer ? playerTwoShips : playerOneShips)) {
      document.body.textContent = "";
      const winMessage = document.createElement("h1");
      winMessage.classList.add("winMsg");
      winMessage.textContent = `${currentPlayer ? "Opponent" : "You"} won!`
      document.body.appendChild(winMessage);
    }
    currentPlayer = !currentPlayer;
    if (currentPlayer) {
      attackRandom(ownBoard, onAttack);
    }
  }
  const area = document.createElement("div");
  area.classList.add("area");
  const args = {playBoard: otherBoard, statBoard: ownBoard, onAttack};
  render(args, "toAttack", area);
  document.body.appendChild(area);
}