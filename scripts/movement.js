function isHorizontalPossible(x) {
    for (var i = 0; i < activeBlocks.length; i++) {
      var r = activeBlocks[i][0];
      var c = activeBlocks[i][1];
      if (c > 0 && c < 10) {
        if (cell(r, c + x) != "" && in_ActiveBlock(r, c + x) == false) {
          //for restricting furthur horizontal move
          return false;
        }
      }
      if (r == row_count) {
        return false; //base condition
      } else if (r < row_count) {
        if (cell(r + 1, c) != "" && in_ActiveBlock(r + 1, c) == false) {
          return false;
        }
      }
    }
    return true;
  }
  
  function moveLeft() {
    if (paused) {
      return;
    }
    if (activeBlocks.length == 0) {
      return;
    }
  
    if (isHorizontalPossible(-1) == false) {
      return;
    }
  
    var tr = document.getElementById("canvas").rows;
  
    if (activeBlocks[0][1] > 0) {
      //checking if left move is possible
      for (var i = 0; i < activeBlocks.length; i++) {
        var r = activeBlocks[i][0],
          c = activeBlocks[i][1];
        let prevColor = cell(r, c);
  
        colorCell([r, c], "");
        colorCell([r, c - 1], prevColor);
        activeBlocks[i][1]--;
      }
    }
  }
  
  function moveRight() {
    if (paused) {
      return;
    }
    if (activeBlocks.length == 0) {
      return;
    }
  
    if (isHorizontalPossible(1) == false) {
      return;
    }
  
    var tr = document.getElementById("canvas").rows;
  
    if (activeBlocks[2][1] < 10) {
      //checking if right move is possible
      for (var i = activeBlocks.length - 1; i >= 0; i--) {
        var r = activeBlocks[i][0],
          c = activeBlocks[i][1];
        let prevColor = cell(r, c);
        colorCell([r, c], "");
        colorCell([r, c + 1], prevColor);
        activeBlocks[i][1]++;
      }
    }
  }
  
  function moveDown(delayTime) {
    if (paused) {
      return;
    }
    if (activeBlocks.length == 0) {
      return;
    }
  
    var flag = true;
    var tr = document.getElementById("canvas").rows;
    var movedownPossible = true;
    var r, c;
    for (var i = 0; i < activeBlocks.length; i++) {
      r = activeBlocks[i][0];
      c = activeBlocks[i][1];
  
      if (r + 1 > row_count) {
        movedownPossible = false;
      } else if (cell(r + 1, c) != "" && in_ActiveBlock(r + 1, c) == false) {
        movedownPossible = false;
      }
    }
  
    if (activeBlocks.length)
      if (activeBlocks[activeBlocks.length - 1][0] > row_count) movedownPossible = false;
  
    if (movedownPossible) {
      for (var i = activeBlocks.length - 1; i >= 0; i--) {
        var r = activeBlocks[i][0],
          c = activeBlocks[i][1];
        let prevColor = cell(r, c);
  
        colorCell([r, c], "");
        colorCell([r + 1, c], prevColor);
  
        activeBlocks[i][0]++;
        flag = false;
      }
      activeMoveDown = setTimeout(moveDown, 1000);
    } else {
      activeBlocks = [];
      clearTimeout(activeMoveDown);
      moveDownRest(200);
    }
  }
  
  function moveDownFast() {
    if (paused) {
      return;
    }
    if (activeBlocks.length == 0) {
      return;
    }
    var tr = document.getElementById("canvas").rows;
    var movedownPossible = true;
  
    var r, c;
    for (var i = 0; i < activeBlocks.length; i++) {
      r = activeBlocks[i][0];
      c = activeBlocks[i][1];
      if (r + 1 > row_count) {
        movedownPossible = false;
      } else if (cell(r + 1, c) != "" && in_ActiveBlock(r + 1, c) == false) {
        movedownPossible = false;
      }
    }
  
    if (activeBlocks[activeBlocks.length - 1][0] > row_count) movedownPossible = false;
  
    if (movedownPossible) {
      for (var i = activeBlocks.length - 1; i >= 0; i--) {
        var r = activeBlocks[i][0],
          c = activeBlocks[i][1];
        let prevColor = cell(r, c);
  
        colorCell([r, c], "");
        colorCell([r + 1, c], prevColor);
  
        activeBlocks[i][0]++;
        flag = false;
      }
    }
  }
  
  function moveDownRest(delayTime) {
    if (paused) {
      return;
    }
    var movedDown = false;
    if (activeBlocks.length == 0) {
      var tr = document.getElementById("canvas").rows;
      for (let i = row_count - 1; i >= 0; i--) {
        for (let j = 0; j < tr[i].cells.length; j++) {
          if (cell(i, j) != "" && cell(i + 1, j) == "") {
            let prevColor = cell(i, j);
  
            colorCell([i, j], "");
            colorCell([i + 1, j], prevColor);
  
            movedDown = true;
          }
        }
      }
    }
  
    if (movedDown) {
      setTimeout(() => {
        moveDownRest(delayTime);
      }, delayTime);
    } else {
      setTimeout(() => {
        removeBlock();
      }, 200);
    }
  }
  