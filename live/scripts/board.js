/*

The Board constructor function is a set of functions
that adjust the DOM according to events passed to it
by the MineSweeper contructor. It is dependent on jQuery.

Instantiate board with:
  var board = new Board({
    view: jQuery Element,
    newGameButton: jQuery Element,
    flagButton: jQuery Element,
    minesLeft: jQuery Element,
    minesLeftContainer: jQuery Element,
    blocks: 2D Array,
    columnClass: String (optional),
    blockClass: String (optional),
    flagClass: String (optional),
    clickedClass: String (optional)
  });

*/

function Board(settings){

  this.init = function(){
    for (var k in settings){
      this[k] = settings[k];
    };
    this.columnClass = this.columnClass || 'col';
    this.blockClass = this.blockClass || 'block';
    this.flagClass = this.flagClass || 'flagged';
    this.clickedClass = this.clickedClass || 'clicked';
    this.build();
  }

  /*****
    HELPER FUNCTIONS:
  *****/

  // ALLOWS A FUNCTION TO RUN WHERE NOTHING HAPPENS
  this.noop = function(){};

  // TAKES THE ID OF A BLOCK ELEMENT AND CONVERTS IT TO WHAT THE MINESWEEPER GAME CAN UNDERSTAND
  this.elementToBlock = function(el){
    var coords = el.attr('id').substr(6).split('_').map(function(x){ return parseInt(x, 10)})
    return {x: coords[0], y: coords[1]};
  };

  // BUILDS THE BOARD
  // RAN IN init FUNCTION
  this.build = function() {
    this.view.empty();
    for (var i = 0; i < this.game.blocks.length; i++){
      this.view.append(
        '<div class="' + this.columnClass + '" id="col_' + i + '"></div>'
      );
      for (var j = 0; j < this.game.blocks[i].length; j++){
        $('#col_' + i).append(
          '<div class="' + this.blockClass + '" id="block_' + i + '_' + j + '"><span></span></div>'
        )
      }
    }
    this.minesLeft.text(this.game.minesLeft);
  };

  this.toggleFlagMode = function(){
    this.game.toggleFlagMode();
    this.game.flagMode ? this.flagButton.val('Flag Mode: On').addClass('on') : this.flagButton.val('Flag Mode: Off').removeClass('on');
  };

  // DETERMINES WHICH FUNCTION BELOW IT TO RUN
  // BASED ON WHAT THE MINESWEEPER GAME RETURNS
  this.click = function(el){
    var block = this.elementToBlock(el),
        click = this.game.click(block);
    return this[click.event](click.data);
  }

  this.flag = function(data){
    this.minesLeft.text(data.minesLeft);
    $('#block_' + data.block).addClass(this.flagClass);
  };
  this.unflag = function(data){
    this.minesLeft.text(data.minesLeft);
    $('#block_' + data.block).removeClass(this.flagClass);
  };
  this.showBlock = function(data){
    $('#block_' + data.block).addClass(this.clickedClass).find('span').text(data.touchingMines);
  };
  this.zeroBlock = function(data){
    this.showBlock(data);
    for (var i = 0; i < data.surroundingBlocks.length; i++){
      this.showBlock(data.surroundingBlocks[i]);
    }
  };
  this.lost = function(data){
    this.view.empty().append('<span class="text game-over">You Lost.</span>');
    this.newGameButton.removeClass('hidden');
    this.flagButton.addClass('hidden');
    this.minesLeftContainer.addClass('hidden');
  };
  this.won = function(data){
    this.showBlock(data);
    this.view.empty().append('<span class="text game-over">You Won.</span>');
    this.newGameButton.removeClass('hidden');
    this.flagButton.addClass('hidden');
    this.minesLeftContainer.addClass('hidden');
  };

  this.init();
};