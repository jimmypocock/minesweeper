// THIS FILE IS DEPRECATED


/*

  Instantiate game with:
  var game = new MineSweeper({
    rows: 8,
    columns: 8,
    bombs: 10
  });

*/


function MineSweeper(settings){

  /*
    settings = {
      rows: Int,
      columns: Int,
      bombs: Int
    }


  */


  // IS GAME ACTIVE
  var gameActive = true,



  // THIS IS SO WE CAN RECIEVE THE NUMBERS AS STRINGS OR INTEGERS
  numRows = parseInt(settings.rows, 10),
  numCols = parseInt(settings.columns, 10),
  numMines = parseInt(settings.mines, 10),



  // FOR FUTURE USE OF ALL BLOCKS NUMBER
  numBlocks = numRows * numCols,




  // WILL BE USED WHEN DETERMINING MINES NEAR SELECTED BLOCK
  // THESE VALUES ARE ALL DISTANCES
  topLeftDist = -numCols - 1,
  topDist = -numCols,
  topRightDist = -numCols + 1,
  leftDist = -1,
  rightDist = 1,
  bottomLeftDist = numCols - 1,
  bottomDist = numCols,
  bottomRightDist = numCols + 1,



  // THESE ARE THE ACTUAL BLOCK VALUES
  topLeft = [1],
  topRight = [numCols],
  bottomLeft = [(numBlocks - numCols + 1)],
  bottomRight = [numBlocks],
  topRow = [],
  leftCol = [],
  rightCol = [],
  bottomRow = [],
  edges = [],



  // THESE ARRAYS WILL HELP US UNDERSTAND WHAT BLOCKS TO CHECK
  // WHEN A BLOCK IS CLICKED
  touchingTopLeft = [rightDist, bottomDist, bottomRightDist], // if block === 1
  touchingTopRight = [leftDist, bottomDist, bottomLeftDist], // if block === numCols
  touchingBottomLeft = [rightDist, topDist, topRightDist], // if block === (numBlocks - numCols + 1)
  touchingBottomRight = [leftDist, topDist, topLeftDist], // if block === numBlocks
  touchingTopRow = [leftDist, rightDist, bottomDist, bottomLeftDist, bottomRightDist], // if block > 1 && block < numCols
  touchingLeftCol = [rightDist, topDist, topRightDist, bottomDist, bottomRightDist], // if (block-1) % 8 === 0 && block !== (numBlocks - numCols + 1) && block !== 1
  touchingRightCol = [leftDist, topDist, topLeftDist, bottomDist, bottomLeftDist], // if block % 8 === 0 && block != numCols && block != numBlocks
  touchingBottomRow = [leftDist, rightDist, topDist, topLeftDist, topRightDist], // if block > (numBlocks - numCols + 1) && block < numBlocks
  touchingMiddle = [leftDist, rightDist, topDist, topLeftDist, topRightDist, bottomDist, bottomLeftDist, bottomRightDist]; // if $.inArray(block, edges) === -1






  // FLAGMODE ON WHEN FLAGGING A MINE
  this.flagMode = false;




  this.minesLeft = numMines;



  // THESE WILL BE POPULATED WITH NEEDED BLOCK DATA
  this.mines = {
    list: []
    // <INT>: {
    //   flagged: BOOL
    // }
  };
  this.emptyBlocks = {
    list: []
    // <INT>: {
    //   flagged: false,
    //   touchingMines: 0,
    //   active: true
    // }
  };
  this.blocks = {
    list: []
  }


  this.populateEdges = function(){
    for (var i = 1; i <= numBlocks; i++){
      if (i > 1 && i < numCols) topRow.push(i);
      if ((i-1) % 8 === 0 && i !== (numBlocks - numCols + 1) && i !== 1) leftCol.push(i);
      if (i % 8 === 0 && i != numCols && i != numBlocks) rightCol.push(i);
      if (i > (numBlocks - numCols + 1) && i < numBlocks) bottomRow.push(i);
    }
    edges.push(topRow, leftCol, rightCol, bottomRow, topLeft, topRight, bottomLeft, bottomRight);
    edges = $.map(edges, function(arr){
      return arr;
    });
    this.populateTouchingMines();
  };


  // POPULATE BOARD WITH RANDOMIZED MINES
  this.populateMines = function(){
    while(this.mines.list.length < numMines){
      var rNum = Math.ceil( Math.random() * numBlocks );
      if (this.mines[rNum]) {continue;}
      this.mines[rNum] = { flagged: false };
      this.mines.list.push(String(rNum));
      this.blocks.list.push(String(rNum));
    }
    this.populateEmptyBlocks();
  };




  // POPULATE EMPTY BLOCKS OBJECT // MINES MUST BE POPULATED FIRST
  this.populateEmptyBlocks = function() {
    for (var i = 1; i <= numBlocks; i++){
      if($.inArray(String(i), Object.keys(this.mines)) === -1){
        this.emptyBlocks[i] = {
          flagged: false,
          touchingMines: 0,
          active: true
        };
        this.emptyBlocks.list.push(String(i));
        this.blocks.list.push(String(i));
      };
    }
    this.populateEdges();
  };



  // CHECKS IF BLOCK IS A MINE
  this.isItAMine = function(value, block) {
    value = block !== undefined ? parseInt(value) + parseInt(block) : value;
    return $.inArray(String(value), Object.keys(this.mines)) !== -1;
  };




  // CHECKS AN ARRAY OF BLOCKS TO RETURN THE NUMBER OF TOUCHING MINES
  this.howManyTouchingMines = function(block, arr) {
    var touchingMines = 0;
    var that = this;
    for (var i = 0; i < arr.length; i++) {
      if (that.isItAMine(block, arr[i])) touchingMines++;
    }
    return touchingMines;
  };



  this.populateTouchingMines = function() {
    var that = this;
    $.each(this.emptyBlocks.list, function(_, block){
      block = parseInt(block);
      if ($.inArray(block, topLeft) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingTopLeft);
      if ($.inArray(block, topRight) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingTopRight);
      if ($.inArray(block, bottomLeft) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingBottomLeft);
      if ($.inArray(block, bottomRight) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingBottomRight);
      if ($.inArray(block, topRow) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingTopRow);
      if ($.inArray(block, leftCol) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingLeftCol);
      if ($.inArray(block, rightCol) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingRightCol);
      if ($.inArray(block, bottomRow) !== -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingBottomRow);
      if ($.inArray(block, edges) === -1) that.emptyBlocks[block].touchingMines = that.howManyTouchingMines(block, touchingMiddle);
    });
  };

  // DOES THIS WORK
  this.toggleFlagMode = function() {
    // if (this.flagMode === true) return this.flagMode = false;
    // return this.flagMode = true;
    return !this.flagMode;
  };



  this.flagBlock = function(block){
    if(this.isItAMine(block)){
      if (this.mines[block].flagged){
        this.mines[block].flagged = false;
        this.minesLeft++
      } else {
        this.mines[block].flagged = true;
        this.minesLeft--;
      }
    } else {
      if (this.emptyBlocks[block].flagged){
        this.emptyBlocks[block].flagged = false
        this.minesLeft++;
      } else {
        this.mines[block].flagged = true;
        this.minesLeft--;
      }
    }
    return 'flag';
  };

  this.click = function(block){
    if (this.flagMode){
      if (this.isItAMine(block) || this.emptyBlocks[block].active){
        return this.flagBlock(block);
      }
    } else {
      if (this.isItAMine(block)){
        if (!this.mines[block].flagged) console.log("You lost bro."); //gameActive = false;
      } else {
        if (this.emptyBlocks[block].active && !this.emptyBlocks[block].flagged){
          this.emptyBlocks[block].active = false;
          if (this.emptyBlocks[block].touchingMines === 0) return this.clickSurroundingBlocks(block);
        }
      }
    }
  };

  this.clickMultiple = function(block, arr){
    var blocks = []
    for (var i = 0; i < arr.length; i++){
      blocks.push(parseInt(block) + parseInt(arr[i])); // this.click(parseInt(block) + parseInt(arr[i]))
    }
    return blocks;
  };


  this.clickSurroundingBlocks = function(block){
    if ($.inArray(block, topLeft) !== -1) return touchingTopLeft; // this.clickMultiple(block, touchingTopLeft);
    if ($.inArray(block, topRight) !== -1) return touchingTopRight; // this.clickMultiple(block, touchingTopRight);
    if ($.inArray(block, bottomLeft) !== -1) return touchingBottomLeft; // this.clickMultiple(block, touchingBottomLeft);
    if ($.inArray(block, bottomRight) !== -1) return touchingBottomRight; // this.clickMultiple(block, touchingBottomRight);
    if ($.inArray(block, topRow) !== -1) return touchingTopRow; // this.clickMultiple(block, touchingTopRow);
    if ($.inArray(block, leftCol) !== -1) return touchingLeftCol; // this.clickMultiple(block, touchingLeftCol);
    if ($.inArray(block, rightCol) !== -1) return touchingRightCol; // this.clickMultiple(block, touchingRightCol);
    if ($.inArray(block, bottomRow) !== -1) return touchingBottomRow; // this.clickMultiple(block, touchingBottomRow);
    if ($.inArray(block, edges) === -1) return touchingMiddle; // this.clickMultiple(block, touchingMiddle);
  };
  this.populateMines();
};



$(document).on('ready', function(){



  $('#start').on('click', function(){
    var game = new MineSweeper({
      rows: 8,
      columns: 8,
      mines: 10
    });

    // THIS GOES SOMEWHERE ELSE
    var buildGameBoard = function() {
      var counter;
      for (var i = 1; i <= 8; i++){
        $('#board').append(
          '<div class="row" data-row=' + i + '></div>'
        );
        counter = (i - 1) * 8 + 1;
        for (var j = counter; j <= counter + (8 - 1); j++){
          $('.row[data-row="'+ i +'"]').append(
            '<div class="block" data-block=' + j + '></div>'
          );
        }
      }
    }
    var populateMineText = function(mines){
      for (var i = 0; i < mines.list.length; i++){
        $('.block[data-block="' + mines.list[i] + '"]').append('<span>b</span>');
      }
    }
    var populateEmptyBlockText = function(emptyBlocks){
      for (var i = 0; i < emptyBlocks.list.length; i++){
        $('.block[data-block="' + emptyBlocks.list[i] + '"]').append(emptyBlocks[emptyBlocks.list[i]].touchingMines)
      }
    }

    var hideBlocks = function(blocks){
      for (var i = 0; i < blocks.list.length; i++){
        $('.block[data-block="' + blocks.list[i] + '"]').css('background', 'black');
      }
    }

    var clickBlock = function(block){
      if (game.isItAMine(block)){

      } else {
        $('.block[data-block="' + block + '"]').css('background', 'white');
        var arr = game.click(block);
        if(arr){
          var blocks = game.clickMultiple(block, arr);
          for (var i = 0; i < blocks.length; i++){
            clickBlock(blocks[i]);
          }
        }
        // } else if (arr = 'flag') {
        //   $('.block[data-block="' + block + '"]').css('background', 'green');
        // }

      }
    }

    buildGameBoard();
    populateMineText(game.mines);
    populateEmptyBlockText(game.emptyBlocks);
    hideBlocks(game.blocks);

    $('.block').on('click', function(){
      clickBlock(this.dataset.block);
    });

    $('#flag').on('click', function(){
      game.toggleFlagMode();
    });
  });



});


