var mineSweeper = { // game object
	// active: true,
	// handler: true,
	gameBlocks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
	bombs: [],
	nonBombs: {}, // { key = number of nonBomb block, value = how many bombs are near it.}
	// playersClicks: [],
	flagMode: false, // depends on whether blocks can be clicked, whether to lay down the flag, and whether to update the bombsLeft property.
	// bombsLeft: 10, // number of bombs left
	// init: function() {
	//     // if(this.handler===false) {
	//     //   this.initBlockHandler();
	//     // }
	//     this.newGame();
	// },
	// initBlockHandler: function() {
	    // var that = this;
	    // $('.block').on('mouseup', function() {
	      // if(that.active === true) {
	        // var block=parseInt($(this).data('box'),10);
	        // that.click($(this), block);
	        // that.logPlayerSequence(block);
	      // }
	    // });
	    // this.handler = true;
	// },
	newGame: function () {
	    // this.displayNumberOfBombsLeft();
	    this.randomizeBombs();
	    this.dropBombs();
	    this.populateNonBombs();
	    this.eachBlocksSurroundings();
	},
	isItABomb: function(number) { // Register the block as clicked.
		// var number = blockNumber.replace('.block', '');
	    // var blockNumber = parseInt(block);
	    if ($.inArray(number, this['bombs']) != -1){
	    	console.log(number + "true");
	    	return true;
	    } else {
	    	console.log(number + "false");
	    	return false;
	    }
	},
	randomizeBombs: function() { // Randomize location of blocks.
	    while(this.bombs.length < 10){
	    	var randomNumber=Math.ceil(Math.random()*64);
	    	var found=false;
	    	for(var i=0; i<this.bombs.length; i++){
	    		if(this.bombs[i]==randomNumber){
	    			found=true;
	    		}
	    	}
	    	if(!found)this.bombs[this.bombs.length]=randomNumber;
	    }
	},
	checkTopLeftBlock: function(val) {
		var num = parseInt(val) - 9;
		if ($.inArray(num,this.bombs) != -1){
			return true;
		} //else {
			return false;
		// }
	},
	checkTopBlock: function(val){
		var num = parseInt(val) - 8;
		if ($.inArray(num,this.bombs) != -1){
			return true;
		}
		return false;
	},
	checkTopRightBlock: function(val){
		// var num = parseInt(val) - 7;
		// if ($.inArray(num,))
	},
	checkLeftBlock: function(val){

	},
	checkRightBlock: function(val){

	},
	checkBottomLeftBlock: function(val){

	},
	checkBottomBlock: function(val){

	},
	checkBottomRightBlock: function(val){

	},
	dropBombs: function() {
		$.each(this.bombs, function(_,val) {
			$('.block'+val).text("Ω");
		});
		// that = this;
	},
	populateNonBombs: function() {
		that = this;
		$.each(this.gameBlocks, function(_,val){
			if($.inArray(val, that['bombs']) == -1){
				that['nonBombs'][val] = {};
			};
		})

		// $.each(this.nonBombs, function(val, num){
		// 	$('.block'+val).text(val);
		// })
	},
	eachBlocksSurroundings: function() {
		that = this;
		$.each(this.nonBombs, function(val,_){
			var bombs = 0;
			var tempArray = [];
			if (parseInt(val) === 1) { // for block 1
				bombs = 0;
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1) { 
					bombs++;
				}
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1) {
					bombs++;
				}
				if ($.inArray(parseInt(val)+9,mineSweeper['bombs']) != -1) {
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) > 1 && parseInt(val) < 8){ // for blocks 2, 3, 4, 5, 6, 7
				bombs = 0;
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				} 
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1){
					bombs++;
				} 
				if ($.inArray(parseInt(val)+7,mineSweeper['bombs']) != -1){
					bombs++;
				} 
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1){
					bombs++;
				} 
				if ($.inArray(parseInt(val)+9,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) == 8){ // for block 8
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) % 8 == 0 && val != 8 && val != 64){ // for blocks 16, 24, 32, 40, 48, 56
				if (that.checkTopLeftBlock(val)){
					bombs++;
				}
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if ((parseInt(val)-1) % 8 == 0 && parseInt(val) != 57 && parseInt(val) != 1){ // for blocks 9, 17, 25, 33, 41, 49
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+9,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) > 57 && parseInt(val) < 64){ // for blocks 58, 59, 60, 61, 62, 63
				if (that.checkTopLeftBlock(val)){
					bombs++;
				}
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) === 57){ // for block 57
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if (parseInt(val) === 64){ // for block 64
				if (that.checkTopLeftBlock(val)){
					bombs++;
				}
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
				tempArray.push(val);
			}
			if ($.inArray(val, tempArray) == -1){ 
				if (that.checkTopLeftBlock(val)){
					bombs++;
				}
				if (that.checkTopBlock(val)){
					bombs++;
				}
				if ($.inArray(parseInt(val)-7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)-1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+1,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+7,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+8,mineSweeper['bombs']) != -1){
					bombs++;
				}
				if ($.inArray(parseInt(val)+9,mineSweeper['bombs']) != -1){
					bombs++;
				}
				mineSweeper.nonBombs[val] = bombs;
			}
		});
		
		$.each(this.nonBombs, function(val, num){
			$('.block'+val).text(num);
		})
	},

	switchToFlagMode: function(){
		if (this.flagMode === true) {
			$('.flag').css('background', 'transparent');
			this.flagMode = false;
		} else {
			$('.flag').css('background', 'black');
			this.flagMode = true;
		}
	}
	// flagBlock: function(block) {
		// place a flag on the block
		// do not allow a player to click this button (('.block').prop('disabled', true))
	// },
	// blowOffScreen: function(block) {
		// individual block looks like it's blown off the screen
		// if player lands on a bomb, all blocks blow off the screen.
	// },
	// logPlayersClicks: function() { // Log the blocks the player selected.
	    
	// },
	// checkBlock: function() { // Check if block that was clicked is a bomb or not.
	    
	// },
	// displayNumberOfBombsLeft: function() { // Updates number of bombs left on board
	   
	// },
	// incorrectClick: function() { // Player clicked a bomb.
	  
	// },
	  
};

// var gameBlock = {
//   	blockNumber: 0,
//  	bomb: false, // whether this block is a bomb
//   	clicked: false,
//   	squaresNextToIt: [],
//   	bombsAroundIt: [],
// 		flagged: true
// };

$(document).ready(function(){
  	$('.start').on('mousedown', function(){
    	mineSweeper.newGame();
    	$.each(mineSweeper.gameBlocks, function(_,val) {
	  		$('.block'+val).on('mouseup', function(){
	  			if (mineSweeper.flagMode == false){
		  			if (mineSweeper.isItABomb(val) == false){
			  			$('.block'+val).css('background', 'white').css('color', 'black') //.css('border', '2px solid black');
			  		} else {
			  			$('.gameContainer').css('background', 'white').css('color','white');
			  		}
			  	} else {
			  		// var attr = $('.block'+val).attr('background', 'black')
			  		// if (typeof attr !== typeof undefined && attr !== false){
			  			$('.block'+val).css('background', 'black');
			  		// } else {
			  		// 	$('.block'+val).attr('background', 'transparent');
			  		// }
			  	}
		  	});
	  	});
    });
    $('.flag').on('mousedown', function(){
    	mineSweeper.switchToFlagMode();
    })

    $('.start').on('mouseup', function(){
    	this.blur();
  	});
  	// $.each(mineSweeper.gameBlocks, function(_,val) {
  	// 	$('.block'+val).on('mouseup', function(){
	  // 		$('.block'+val).css('background', 'white');
	  // 	});
  	// })
  	// $('.block').on('mouseup', function(){
  	// 	$('.block').css('background', 'white');
  	// });
  
});