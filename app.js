const p1Color = "rgb(79, 126, 255)";
const p2Color = "rgb(255, 79, 105)";
const currentPlayerBox = document.querySelector('#player-preview');
const boardParent = document.querySelector('.board-parent');
const resultParent = document.querySelector('#result-parent');

let boardData = {}; // key: 'row-col': {owner: p1/p2}
let currentPlayer = 1;
let canPlay = true;
let count = 0;

function onBoxClicked(e) {
	const target = e.target;
	const row = target.getAttribute("data-row");
	const col = target.getAttribute("data-col");
  const key = `${row}-${col}`;
	if (!isValid(row) || !isValid(col) || key in boardData || !canPlay) return;
  count++;
	boardData[key] = { owner: currentPlayer };
  const playerWon = checkWinner(row, col);
  const isP1 = currentPlayer == 1;
  target.classList.add(isP1 ? 'p1-box' : 'p2-box');
  if (playerWon || count == 9) {
    canPlay = false;
    showResult(count == 9);
    return;
  }
  changePlayer(isP1);
}

function resetBoard() {
  for(let box of boardParent.children) {
    box.classList.remove('p1-box');
    box.classList.remove('p2-box');
  }
  changePlayer(false);
  boardData = {};
  canPlay = true;
  resultParent.style.display = 'none';
  count = 0;
}

function changePlayer(isP1) {
  if (isP1) {
    currentPlayerBox.classList.remove('p1-box');
    currentPlayerBox.classList.add('p2-box');
  } else {
    currentPlayerBox.classList.remove('p2-box');
    currentPlayerBox.classList.add('p1-box');
  }
  currentPlayer = isP1 ? 2 : 1;
}

function checkWinner(row, col) {
  row = parseInt(row);
  col = parseInt(col);
  let count = 0;
  for (let i = 0; i <= 2; i++) {
    const key = `${i}-${col}`;
    if (!checkBoxOwner(key)) {
      continue;
    }
    count++;
  }
  if (count == 3) return true;
  count = 0;
  for (let i = 0; i <=2; i++) {
    const key = `${row}-${i}`;
    if (!checkBoxOwner(key)) {
      continue;
    }
    count++;
  }
  if (count == 3) return true;
  count = 0;
  for (let i = 0; i <= 2; i++) {
    const key1 = `${i}-${i}`;
    if (!checkBoxOwner(key1)) {
      continue;
    }
    count++;
  }
  if (count == 3) return true;
  count = 0;
  for (let i = 2; i >= 0; i--) {
    const key1 = `${i}-${i}`;
    if (!checkBoxOwner(key1)) {
      continue;
    }
    count++;
  }
  if (count == 3) return true;
  return false;
}

function checkBoxOwner(key) {
  return key in boardData && boardData[key].owner == currentPlayer;
}

function isValid(value) {
	if (value < 0 || value > 2) return false;
	return true;
}

function showResult(draw) {
  const resultBox = document.querySelector('#player-result');
  const winText = document.querySelector('#win-text');

  if (draw) {
    resultBox.classList.add('draw-box');
    resultParent.style.display = 'block';
    winText.innerText = 'DRAW 📍';
    return;
  }
  resultBox.classList.remove('draw-box');
  if (currentPlayer == 2) {
    resultBox.classList.remove('p1-box');
    resultBox.classList.add('p2-box');
  } else {
    resultBox.classList.remove('p2-box');
    resultBox.classList.add('p1-box');
  }
  resultParent.style.display = 'block';
  winText.innerText = 'WON';
}