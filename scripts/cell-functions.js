function cell(r, c) {
    var tr = document.getElementById("canvas").rows;
    return tr[r].cells[c].style.backgroundColor;
  }
  
  function colorCell(rc, color, forNextBlock = false) {
    var tr;
    if (forNextBlock) {
      tr = document.getElementById("nextBlock").rows;
      tr[rc[0] - 1].cells[rc[1] - 1].style.backgroundColor = color;
    } else {
      tr = document.getElementById("canvas").rows;
      tr[rc[0]].cells[rc[1]].style.backgroundColor = color;
    }
  }
  
  fillCells.idx = 1; //starting index of color array
  function fillCells(c1, c2, c3, c4) {
    var colorSet = [
      "red",
      "green",
      "blue",
      "yellow",
      "magenta",
      "cyan",
      "purple"
    ];
    var tr = document.getElementById("canvas").rows;
  
    var tileColor = [
      colorSet[fillCells.idx % 7],
      colorSet[(fillCells.idx + 1) % 7],
      colorSet[(fillCells.idx + 2) % 7],
      colorSet[(fillCells.idx + 3) % 7]
    ];
  
    if (totalBlocks % 7 == 0) {
      colorCell(c1, colorSet[fillCells.idx % 7], true),
        colorCell(c2, colorSet[fillCells.idx % 7], true);
      colorCell(c3, colorSet[fillCells.idx % 7], true);
      if (c4.length != 0) {
        colorCell(c4, colorSet[fillCells.idx % 7], true);
      }
    } else {
      colorCell(c1, tileColor[0], true);
      colorCell(c2, tileColor[1], true);
      colorCell(c3, tileColor[2], true);
      if (c4.length != 0) {
        colorCell(c4, tileColor[3], true);
      }
    }
  
    fillCells.idx += 2;
  }
  
  function valid(i, j) {
    var tr = document.getElementById("canvas").rows;
  
    if (i >= 0 && i < tr.length && j >= 0 && j < tr[0].cells.length) return true;
    else return false;
  }
  