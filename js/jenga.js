//--Jenga actions--//
var difficulty = ["easy", "normal", "hard"];
var difficultySelect = 0;
var actions;
displayActionScreen();

function displayActionScreen() {
  document.getElementById("actionsDisplayText").innerText = "";
  actions = getActions();
}

function displayAction() {
  var i = Math.floor(Math.random() * actions.length);
  console.log(actions.length);
  var action = actions.splice(i, 1);
  document.getElementById("actionsDisplayText").innerText = action;
}

function getActions() {
  var arr = [];
  var selectedDifficulty = difficulty[difficultySelect];
  const query = document.querySelectorAll('.'+selectedDifficulty+'-mode');
  for (let i=0; i<query.length;i++) {
    arr[i] = query[i].outerText;
  }
  return arr;
}

function selectDifficulty(orientation) {
  document.getElementById(difficulty[difficultySelect]).style.display = "none";
  document.getElementById("play-btn").classList.remove(difficulty[difficultySelect]+'-play');

  difficultySelect += orientation;
  console.log(difficulty[difficultySelect]);
  if(difficultySelect >= difficulty.length) difficultySelect = 0;
  else if (difficultySelect < 0) difficultySelect = difficulty.length - 1;

  document.getElementById("game-mode").innerText = difficulty[difficultySelect].toUpperCase();
  document.getElementById(difficulty[difficultySelect]).style.display = "block";
  
  document.getElementById("play-btn").classList.add(difficulty[difficultySelect]+'-play');
}

function chooseDifficulty() {
  document.getElementById("gameSelect").style.display = "none";
  document.getElementById("actionsDisplay").style.display = "inline";
  displayActionScreen();
}

function changeDifficulty() {
  document.getElementById("gameSelect").style.display = "inline";
  document.getElementById("actionsDisplay").style.display = "none";
}