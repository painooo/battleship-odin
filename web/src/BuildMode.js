import { render } from './util.js';

function renderShipSelectionBtns(shipList, selection) {
  selection.textContent = "";
  selection.dataset.ship = "";
  for (let name in shipList) {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => {selection.dataset.ship = name};
    selection.appendChild(btn);
  }
}
export default function BuildMode(shipList, board, onSubmit) { // I do not want to touch this again
  document.body.textContent = "";
  let selectionList = structuredClone(shipList);

  const shipSelection = document.createElement("div");
  shipSelection.classList.add("shipSelection");
  const renderBtn = (shipList) => renderShipSelectionBtns(shipList, shipSelection);

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("reset");
  resetBtn.textContent = "Reset"

  const dirSelection = document.createElement("select");
  dirSelection.classList.add("dirSelection");
  const vertical = document.createElement("option");
  vertical.value = "VERTICAL";
  vertical.textContent = "Vertical";
  const horizontal = document.createElement("option");
  horizontal.value = "HORIZONTAL";
  horizontal.textContent = "Horizontal";
  dirSelection.appendChild(horizontal);
  dirSelection.appendChild(vertical);

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("submit");
  submitBtn.textContent = "Submit";
  submitBtn.onclick = () => {
    if (Object.keys(selectionList).length == 0) onSubmit(shipList);
  };

  const onSuccess = (index) => {
    delete selectionList[index];
    renderBtn(selectionList);
  }
  const onBuild = (status, index) => {
    if (status) {
      onSuccess(index);
    }
  }

  const area = document.createElement("div");
  const args = {playBoard: board, onBuild} 
  const renderBuild = () => render(args, "toBuild", area, shipList);

  resetBtn.onclick = () => {
    board.board = board.newBoard();
    selectionList = structuredClone(shipList);
    renderBtn(selectionList);
    renderBuild();
  }

  renderBtn(shipList)
  renderBuild();

  document.body.appendChild(dirSelection);
  document.body.appendChild(shipSelection);
  document.body.appendChild(submitBtn);
  document.body.appendChild(resetBtn);
  document.body.appendChild(area);

  return shipList;
}