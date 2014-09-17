var mineSweeper = { // game object
	// active: true,
	// handler: true,
	gameBlocks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
	bombs: [],
	nonBombs: {}, // { key = number of nonBomb block, value = how many bombs are near it.}
	// playersClicks: [],
	flagMode: false,
	topLeft: -9,
	topBlock: -8,
	topRight: -7,
	leftBlock: -1,
	rightBlock: 1,
	bottomLeft: 7,
	bottomBlock: 8,
	bottomRight: 9, // depends on whether blocks can be clicked, whether to lay down the flag, and whether to update the bombsLeft property.
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
	    this.placeNonBombs();
	},
	isItABomb: function(number) { // Register the block as clicked.
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
	    		if(this.bombs[i]==randomNumber) found=true;
	    	}
	    	if (!found) this.bombs[this.bombs.length]=randomNumber;
	    }
	},
	checkBlock: function(value, block){
		var num = parseInt(value) + parseInt(block);
		if ($.inArray(num, this.bombs) != -1) return true;
		return false;
	},
	dropBombs: function() {
		$.each(this.bombs, function(_,val) {
			$('.block'+val).text("Ω");
		});
	},
	populateNonBombs: function() {
		that = this;
		for (var i = 1; i < 65; i++){// $.each(this.gameBlocks, function(_,val){ 
			if($.inArray(i, that['bombs']) == -1){
				that['nonBombs'][i] = {};
			};
		}
	},
	placeNonBombs: function() {
		that = this;
		$.each(this.nonBombs, function(val,_){
			var bombs = 0;
			var bombArray = [];
			if (parseInt(val) === 1) { // for block 1
				bombs = 0;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) > 1 && parseInt(val) < 8){ // for blocks 2, 3, 4, 5, 6, 7
				bombs = 0;
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) === 8){ // for block 8
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) % 8 === 0 && parseInt(val) != 8 && parseInt(val) != 64){ // for blocks 16, 24, 32, 40, 48, 56
				if (that.checkBlock(val, that.topLeft))     bombs++;
				if (that.checkBlock(val, that.topBlock))    bombs++;
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if ((parseInt(val)-1) % 8 === 0 && parseInt(val) != 57 && parseInt(val) != 1){ // for blocks 9, 17, 25, 33, 41, 49
				if (that.checkBlock(val, that.topBlock))    bombs++;
				if (that.checkBlock(val, that.topRight))    bombs++;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) > 57 && parseInt(val) < 64){ // for blocks 58, 59, 60, 61, 62, 63
				if (that.checkBlock(val, that.topLeft))    bombs++;
				if (that.checkBlock(val, that.topBlock))   bombs++;
				if (that.checkBlock(val, that.topRight))   bombs++;
				if (that.checkBlock(val, that.leftBlock))  bombs++;
				if (that.checkBlock(val, that.rightBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) === 57){ // for block 57
				if (that.checkBlock(val, that.topBlock))   bombs++;
				if (that.checkBlock(val, that.topRight))   bombs++;
				if (that.checkBlock(val, that.rightBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if (parseInt(val) === 64){ // for block 64
				if (that.checkBlock(val, that.topLeft))   bombs++;
				if (that.checkBlock(val, that.topBlock))  bombs++;
				if (that.checkBlock(val, that.leftBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				bombArray.push(val);
			}
			if ($.inArray(val, bombArray) === -1){ // make sure the rest of the bombs evaluate to 0;
				if (that.checkBlock(val, that.topLeft))     bombs++;
				if (that.checkBlock(val, that.topBlock))    bombs++;
				if (that.checkBlock(val, that.topRight))    bombs++;
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
			}

		});
		
		$.each(this.nonBombs, function(val, num){
			if (num['touchingBombs'] > 0){
				$('.block'+val).text(num['touchingBombs']);
			} else {
				$('.block'+val).text('');
			}
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
	},
	click: function(blockNumber) {
		if (this.flagMode === true){
			if (this.nonBombs[blockNumber]['flagged'] === true){
				$('.block'+blockNumber).removeClass('flagged');
				this.nonBombs[blockNumber]['flagged'] = false
			} else {
				$('.block'+blockNumber).addClass('flagged');
				this.nonBombs[blockNumber]['flagged'] = true
			}
		} else {
			if (this.isItABomb(blockNumber) == false){
	  			$('.block'+blockNumber).css('background', 'white').css('color', 'black') 
	  		} else {
	  			$('.gameContainer').css('background', 'white').css('color','white');
	  		}
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
	// displayNumberOfBombsLeft: function() { // Updates number of bombs left on board
	   
	// },
	// incorrectClick: function() { // Player clicked a bomb.
	  
	// },
	  
};

$(document).ready(function(){
  	$('.start').on('mousedown', function(){
    	mineSweeper.newGame();
    	$.each(mineSweeper.gameBlocks, function(_,val) {//
	  		$('.block'+val).on('mouseup', function(){
	  			// console.log(i);
	  			mineSweeper.click(val);


	  			// if (mineSweeper.flagMode == false){
		  		// 	if (mineSweeper.isItABomb(i) == false){
			  	// 		$('.block'+i).css('background', 'white').css('color', 'black') //.css('border', '2px solid black');
			  	// 	} else {
			  	// 		$('.gameContainer').css('background', 'white').css('color','white');
			  	// 	}
			  	// } else {
			  	// 	// var attr = $('.block'+i).attr('background', 'black')
			  	// 	// if (typeof attr !== typeof undefined && attr !== false){
			  	// 		$('.block'+i).css('background', 'black');
			  	// 	// } else {
			  	// 	// 	$('.block'+i).attr('background', 'transparent');
			  	// 	// }
			  	// }
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