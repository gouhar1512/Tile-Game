var created = false;
var paused = false;
var startStop = document.getElementById("startStop");
var playPause = document.getElementById("playPause");
var activeBlocks = [];
var blockType = 2;
var specialBlockType = 1;
var totalBlocks = 1;
var sc = 0;
var activeMoveDown;
var activeMoveRest;
var activeRemoveBlock;

startStop.onclick = function() {
  if (this.innerText == "Start") {
    this.innerText = "Restart";
    startGame();
  } else {
    restartGame();
  }
};

playPause.onclick = function() {
  if (this.innerText == "Play") {
    paused = false;
    moveDown();
    this.innerText = "Pause";
  } else {
    pauseGame();
    this.innerText = "Play";
  }
};

function createGameWindow() {
  if (created == false) {
    var canvas = document.getElementById("canvas");
    for (var i = 0; i < 20; i++) {
      var newRow = canvas.insertRow();
      for (var j = 0; j < 11; j++) {
        var newCell = newRow.insertCell(j);
      }
    }
    created = true;
  }
}

createGameWindow();
tileEffect();

function startGame() {
  colorCell([1, 1], "red", true);
  colorCell([1, 2], "green", true);
  colorCell([1, 3], "blue", true);

  generateBlock();
}
function restartGame() {
  pauseGame();
  document.querySelector('.restart').style.display ='block';
}
function cancelRestart() {
  document.querySelector('.restart').style.display = 'none';
  pauseGame();
}

function pauseGame() {

  if (!paused) {
    paused = true;
    clearTimeout(activeMoveDown);
  } else {
    paused = false;
    activeMoveDown = setTimeout(moveDown, 1000);
  }
}


function calculateScore() {
  var score = document.getElementById("score");
  score.innerHTML = sc;
}



function gameOver() {
  for(var j=0 ; j<column_count ; j++){
    if(cell(0, j) != '' && !in_ActiveBlock(0, j)){
      alert(`Game over, Your score is ${sc}`);
      window.location.reload();
    }
  }
  return false;
}

document.onkeydown = checkKey;
function checkKey(e) {
  if (paused) {
    return;
  }
  if (activeBlocks.length == 0) {
    return;
  }

  e = e || window.event;
  if (e.keyCode == "38") {
    interChangeColors();
  }
  if (e.keyCode == "40") {
    moveDownFast();
  } else if (e.keyCode == "37") {
    moveLeft();
  } else if (e.keyCode == "39") {
    moveRight();
  }
}

function tileEffect() {
  ///add tiles effect on cells
  var tr = document.getElementById("canvas").rows;
  for (var i = 0; i < tr.length; i++) {
    for (var j = 0; j < tr[i].cells.length; j++) {
      if (cell(i, j) != "") {
        tr[i].cells[j].style.border = "1px solid black";
        tr[i].cells[j].style.boxShadow =
          "inset 1px 1px 1px 1px rgba(255,255,255, .50), inset -1px -1px 1px 1px rgba(0,0,0, .26)";
      } else {
        tr[i].cells[j].style.border = "1px solid transparent";
        tr[i].cells[j].style.boxShadow =
          "inset 0px 0px 0px 0px , inset 0px 0px 0px 0px";
      }
    }
  }
  setTimeout(tileEffect, 1);
}
