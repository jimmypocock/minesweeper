/*

The MineSweeper contructer function is a set of functions
and variables that generate the necessary events and data
needed for those events to play a game of MineSweeper.
It does not have any dependencies.

Instantiate game with:
  var game = new MineSweeper({
    rows: Int,
    columns: Int,
    mines: Int
  });

*/

var counter = 0


function MineSweeper(settings){

  /*****
    HELPER FUNCTIONS:
  *****/

  // GENERATE NUMBER FOR RANDOMIZED MINES
  var generateNum = function(max){
    return String(Math.ceil( Math.random() * max - 1));
  };

  this.blockToString = function(block){
    return String(block.x) + '_' + String(block.y);
  };

  // CHECK IF GAME IS ACTIVE
  this.active = true;

  // THIS IS SO WE CAN RECIEVE THE NUMBERS AS STRINGS OR INTEGERS
  this.numRows = parseInt(settings.rows, 10),
  this.numColumns = parseInt(settings.columns, 10),
  this.numMines = parseInt(settings.mines, 10),

  // FLAGMODE ON WHEN FLAGGING A MINE
  this.flagMode = false;

  // TO SHOW NUMBER OF MINES FLAGGED
  this.minesLeft = this.numMines;

  // A MINE WILL LOOK LIKE: '0_1':[0,1]
  this.mines = {};

  // THIS IS A 2D ARRAY [[]]
  this.blocks = [];
  this.blocksLeft = (this.numRows * this.numColumns) - this.numMines;

  // RUN IMMEDIATELY TO POPULATE MINES
  this.populateMines = function(){
    this.mines = {};
    while(Object.keys(this.mines).length < this.numMines){
      var x = generateNum(this.numColumns),
          y = generateNum(this.numRows),
          key = x+'_'+y;
      if (this.mines[key]) continue;
      this.mines[key] = true;
    }
    return this.mines;
  };

  // MINES MUST BE POPULATED FIRST
  this.populateBlocks = function(){
    var row,
        coords;
    for (var x = 0; x < this.numColumns; x++){
      row = []
      for (var y = 0; y < this.numRows; y++){
        coords = {x:x, y:y};
        row.push({
          flagged: false,
          active: true
        });
      }
      this.blocks.push(row);
    }
    return this.blocks;
  };

  // CHECKS IF BLOCK IS A MINE
  this.isItAMine = function(coords) {
    var block = this.blockToString(coords);
    return this.mines[block] || false;
  }

  // DETERMINE HOW MANY TOUCHING MINES BY COORDS
  this.touching = function(block) { // {x:Int, y:Int}
    var mines = [],
        blocks = []
        x = block.x,
        y = block.y,
        block = {},
        that = this,

        push = function(block){
          if (that.blocks[block.x][block.y].active) blocks.push(block);
          if (that.isItAMine(block)) mines.push(block);
        };

    if (y !== 0 && x !== 0)                               push({ x:x-1, y:y-1 });
    if (y !== 0)                                          push({ x:x,   y:y-1 });
    if (y !== 0 && x !== this.numColumns-1)               push({ x:x+1, y:y-1 });
    if (x !== 0)                                          push({ x:x-1, y:y   });
    if (x !== this.numColumns-1)                          push({ x:x+1, y:y   });
    if (x !== 0 && y !== this.numRows-1)                  push({ x:x-1, y:y+1 });
    if (y !== this.numRows-1)                             push({ x:x,   y:y+1 });
    if (x !== this.numColumns-1 && y !== this.numRows-1)  push({ x:x+1, y:y+1 });

    counter = blocks.length;
    console.log('touching ' + counter);

    return {
      mines: mines,
      activeBlocks: blocks
    };
  };

  // TOGGLE FLAG MODE
  this.toggleFlagMode = function() {
    this.flagMode = !this.flagMode;
  };

  // TOGGLE FLAG ATTRIBUTE BY COORDS
  this.toggleFlag = function(block) {
    var x = block.x,
        y = block.y
    this.blocks[x][y].flagged ? this.minesLeft++ : this.minesLeft--;
    this.blocks[x][y].flagged = !this.blocks[x][y].flagged;
  };






  this.clickMultiple = function(block){
    var activeBlocks = this.touching(block).activeBlocks,
        surroundingBlocks = [],
        x, y;
    for (var i = 0; i < activeBlocks.length; i++){
      x = activeBlocks[i].x;
      y = activeBlocks[i].y;
      if (!this.blocks[x][y].flagged){
        that.deactivate(moreActive[i]);
        var touchingMines = this.touching(activeBlocks[i]).mines.length;
        surroundingBlocks.push({
          block: this.blockToString(activeBlocks[i]),
          touchingMines: touchingMines
        });




        // debugger;
        if (touchingMines === 0){
          var moreActive = this.clickMultiple(activeBlocks[i]);


          // debugger;
          for (var j = 0; j < moreActive.length; j++){
            surroundingBlocks.push(moreActive[j]);
          }
        }
      }
    }


    // debugger;
    return surroundingBlocks;
  };

  this.click = function(block){
    var x = block.x,
        y = block.y,
        click = {
          event: 'noop',
          data: {}
        };
    if (this.blocks[x][y].active && this.active){
      if (this.flagMode){
        this.toggleFlag(block);
        if (this.blocks[x][y].flagged) {
          click.event = 'flag';
          click.data = {
            minesLeft: this.minesLeft,
            block: this.blockToString(block)
          };
        } else {
          click.event = 'unflag';
          click.data = {
            minesLeft: this.minesLeft,
            block: this.blockToString(block)
          };
        }
      } else {
        if (!this.blocks[x][y].flagged) {
          if (this.isItAMine(block)){
            this.gameOver();
            click.event = 'lost';
          } else {
            if (this.blocksLeft <= 1){
              this.gameOver();
              click.event = 'won';
              click.data = {
                block: this.blockToString(block),
                touchingMines: this.touching(block).mines.length
              }
            } else {
              this.deactivate(block);
              if (this.touching(block).mines.length === 0) {
                var blocks = this.clickMultiple(block);
                click.event = 'zeroBlock';
                click.data = {
                  block: this.blockToString(block),
                  touchingMines: this.touching(block).mines.length,
                  surroundingBlocks: blocks
                }
              } else {
                click.event = 'showBlock';
                click.data = {
                  block: this.blockToString(block),
                  touchingMines: this.touching(block).mines.length
                }
              }
            }
          }
        }
      }
    }
    return click;
  };

  this.deactivate = function(block){
    var x = block.x,
        y = block.y;
    if (this.blocks[x][y].active) this.blocksLeft--;
    this.blocks[x][y].active = false;
  };

  this.gameOver = function(){
    this.active = false;
  };

  // this.events = function(e, block){
  //   showBlock: {
  //     event: 'showBlock',
  //     data: {
  //       block: this.blockToString(block),
  //       touchingMines: this.touching(block).mines.length
  //     }
  //   }
  // }

  this.populateMines();
  this.populateBlocks();
};