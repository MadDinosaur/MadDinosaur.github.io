//--Jenga actions--//
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
  const query = document.querySelectorAll('.action');
  for (let i=0; i<query.length;i++) {
    arr[i] = query[i].outerText;
  }
  return arr;
}