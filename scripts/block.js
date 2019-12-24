  function generateBlock() {
    if (paused) {
      return;
    }
    if(gameOver()){
      return;
    }

    totalBlocks++;
    var tr = document.getElementById("canvas").rows;
    for (let i = 0; i < row_count; i++) {
      for (let j = 0; j < tr[i].cells.length - 1; j++) {
        if (
          cell(i, j) != "" &&
          cell(i + 1, j) == "" &&
          in_ActiveBlock(i, j) == false
        ) {
          return; //tendency of any cell to come down
        }
      }
    }
  
    var tr2 = document.getElementById("nextBlock").rows;
    for (let i = 0; i < tr2.length; i++) {
      for (let j = 0; j < tr2[i].cells.length; j++) {
        var nbColor = tr2[i].cells[j].style.backgroundColor;
        if (nbColor != "") {
          tr[i].cells[j + 4].style.backgroundColor = nbColor;
          activeBlocks.push([i, j + 4]);
          tr2[i].cells[j].style.backgroundColor = "";
        }
      }
    }
  
    if (totalBlocks % 7 == 0) {
      if (specialBlockType == 1) {
        fillCells([1, 1], [1, 2], [1, 3], []);
        specialBlockType = 2;
      } else if (specialBlockType == 2) {
        fillCells([1, 1], [2, 1], [3, 1], []);
        specialBlockType = 3;
      } else if (specialBlockType == 3) {
        fillCells([1, 1], [2, 1], [1, 2], [2, 2]);
        specialBlockType = 1;
      }
    } else {
      if (blockType == 1) {
        fillCells([1, 1], [1, 2], [1, 3], []);
        blockType = 2;
      } else if (blockType == 2) {
        fillCells([1, 1], [2, 1], [3, 1], []);
        blockType = 3;
      } else if (blockType == 3) {
        fillCells([1, 1], [2, 1], [1, 2], [2, 2]);
        blockType = 1;
      }
    }
    setTimeout(function() {
      moveDown();
    }, 1000);
  }

  function in_ActiveBlock(r, c) {
    for (var i = 0; i < activeBlocks.length; i++) {
      if (r == activeBlocks[i][0] && c == activeBlocks[i][1]) {
        return true;
      }
    }
    return false;
  }
  
  function removeBlock() {
    if (paused) {
      return;
    }
  
    var tr = document.getElementById("canvas").rows;
  
    var removed = false;
  
    var toRemove = [];
  
    
    var row = [0,    0,  -1, -2,  -1, -2,  -1, -2,  0,  0,  1,  2,  1,  2,   1,  2,  0,  0,  -1, 1,  -1,  1, -1,  1];
    var col = [-1,  -2,  -1, -2,   0,  0,   1,  2,  1,  2,  1,  2,  0,  0,  -1, -2, -1,  1,  -1, 1,   0,  0,  1, -1];

   
    for (i = 0; i <= row_count; i++) {
      for (j = 0; j < tr[i].cells.length; j++) {
        var flag = false;
        for (var k = 0; k < 24; k += 2) {
          if (
            valid(i + row[k], j + col[k]) &&
            valid(i + row[k + 1], j + col[k + 1])
          ) {
            if (
              cell(i, j) != "" &&
              cell(i, j) == cell(i + row[k], j + col[k]) &&
              cell(i, j) == cell(i + row[k + 1], j + col[k + 1])
            ) {
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          toRemove.push([i, j]);
        }
      }
    }
  
    if (toRemove.length) {
      removed = true;
      sc += toRemove.length;
  
      for (var i = 0; i < toRemove.length; i++) {
        var r = toRemove[i][0];
        var c = toRemove[i][1];
        colorCell([r, c], "");
      }
    }
  
    if (removed == false) {
      setTimeout(() => {
        generateBlock();
      }, 200);
    } else {
      calculateScore();
      setTimeout(() => {
        moveDownRest(0);
      }, 200);
    }
  }
  
  function interChangeColors() {
    if (paused) {
      return;
    }
    if (activeBlocks.length == 0) {
      return;
    }
  
    if (!isHorizontalPossible(-1) && !isHorizontalPossible(1)) {
      return;
    }
    var tr = document.getElementById("canvas").rows;
    var r = activeBlocks[0][0],
      c = activeBlocks[0][1];
  
    var temp = cell(r, c);
  
    for (var i = 0; i < activeBlocks.length - 1; i++) {
      var cr = activeBlocks[i][0],
        cc = activeBlocks[i][1];
      var nr = activeBlocks[i + 1][0],
        nc = activeBlocks[i + 1][1];
      colorCell([cr, cc], cell(nr, nc));
    }
  
    var lr = activeBlocks[activeBlocks.length - 1][0],
      lc = activeBlocks[activeBlocks.length - 1][1];
    colorCell([lr, lc], temp);
  }
  