const row_count = 19;
const column_count = 11;
const rowIdx = [0,    0,  -1, -2,  -1, -2,  -1, -2,  0,  0,  1,  2,  1,  2,   1,  2,  0,  0,  -1, 1,  -1,  1, -1,  1];
const colIdx = [-1,  -2,  -1, -2,   0,  0,   1,  2,  1,  2,  1,  2,  0,  0,  -1, -2, -1,  1,  -1, 1,   0,  0,  1, -1];

const specialBlockType1 = [ [1,1], [1,2], [1,3], [] ];
const specialBlockType2 = [ [1,1], [2,1], [3,1], [] ];
const specialBlockType3 = [ [1,1], [2,1], [1,2], [2,2] ];
const blockType1 = [ [1,1],[1,2],[1,3],[] ];
const blockType2 = [ [1,1],[2,1],[3,1],[] ];
const blockType3 = [ [1,1], [2,1], [1,2], [2,2] ];

const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;

const colorSet = [
    'red',
    'green',
    'blue',
    'yellow',
    'magenta',
    'cyan',
    'purple',
];


