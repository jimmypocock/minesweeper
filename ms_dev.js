var mineSweeper = { // game object
	// active: true,
	// handler: true,
	// gameBlocks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64],
	bombs: {
	//	#: {
	//		flagged: BOOLEAN
	//		}
	},
	nonBombs: {
	// 	#: {
	//		touchingBombs: 	#,
	//		active: 		BOOLEAN,
	//		flagged: 		BOOLEAN
	//		}
	}, 
	// playersClicks: [],
	flagMode: false,
	bombsLeft: 10,
	topLeft: -9,
	topBlock: -8,
	topRight: -7,
	leftBlock: -1,
	rightBlock: 1,
	bottomLeft: 7,
	bottomBlock: 8,
	bottomRight: 9, // depends on whether blocks can be clicked, whether to lay down the flag, and whether to update the bombsLeft property.
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

	// SET UP A NEW GAME
	newGame: function () {
	    // this.displayNumberOfBombsLeft();
	    this.randomizeBombs();
	    this.dropBombs();
	    this.populateNonBombs();
	    this.placeNonBombs();
	},

	// RANDOMLY CHOOSE 10 BOMBS, POPULATE BOMBS OBJECT
	randomizeBombs: function() {
	    while(Object.keys(this.bombs).length < 10){
	    	var randomNumber=Math.ceil(Math.random()*64);
	    	var found=false;
	    	for(var i=0; i < Object.keys(this.bombs).length; i++){
	    		if(Object.hasOwnProperty(this.bombs, randomNumber)){
	    			found=true;
	    		}
	    	}
	    	if (!found) {
	    		this.bombs[randomNumber] = {
	    			flagged: false
	    		};
	    	}
	    }
	},

	// PLACE BOMBS ON GAME BOARD
	dropBombs: function() {
		$.each(this.bombs, function(val,_) {
			// console.log(val);
			$('.block'+val).text("Ω");
		});
	},

	// POPULATE NONBOMBS OBJECT
	populateNonBombs: function() {
		var that = this;
		for (var i = 1; i < 65; i++){// $.each(this.gameBlocks, function(_,val){ 
			// console.log(Object.keys(this.bombs));
			if($.inArray(String(i), Object.keys(this.bombs)) == -1){
				// console.log(i);
				// console.log(i, Object.keys(this.bombs));
				that['nonBombs'][i] = {
					flagged: false,
					touchingBombs: 0,
					active: true
				};
			};
		}
	},

	// PLACE NONBOMBS ON GAME BOARD
	placeNonBombs: function() {
		that = this;
		$.each(this.nonBombs, function(val,_){
			var parsedVal = parseInt(val, 10);
			var bombs = 0; // TO CALCULATE TOUCHING BOMBS FOR EACH NONBOMB
			var edges = []; // TEMPORARY ARRAY TO COLLECT EDGE NUMBERS

			// BLOCK: 1 (TOP LEFT CORNER)
			if (parsedVal === 1) {
				bombs = 0;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCK: 8 (TOP RIGHT CORNER)
			if (parsedVal === 8){
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCK: 57 (BOTTOM LEFT CORNER)
			if (parsedVal === 57){
				if (that.checkBlock(val, that.topBlock))   bombs++;
				if (that.checkBlock(val, that.topRight))   bombs++;
				if (that.checkBlock(val, that.rightBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCK: 64 (BOTTOM RIGHT CORNER)
			if (parsedVal === 64){
				if (that.checkBlock(val, that.topLeft))   bombs++;
				if (that.checkBlock(val, that.topBlock))  bombs++;
				if (that.checkBlock(val, that.leftBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCKS: 2, 3, 4, 5, 6, 7 (TOP ROW)
			if (parsedVal > 1 && parsedVal < 8){
				bombs = 0;
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCKS: 9, 17, 25, 33, 41, 49 (FAR LEFT COLUMN)
			if ((parsedVal-1) % 8 === 0 && parsedVal != 57 && parsedVal != 1){
				if (that.checkBlock(val, that.topBlock))    bombs++;
				if (that.checkBlock(val, that.topRight))    bombs++;
				if (that.checkBlock(val, that.rightBlock))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				if (that.checkBlock(val, that.bottomRight)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// BLOCKS: 16, 24, 32, 40, 48, 56 (FAR RIGHT COLUMN)
			if (parsedVal % 8 === 0 && parsedVal != 8 && parsedVal != 64){
				if (that.checkBlock(val, that.topLeft))     bombs++;
				if (that.checkBlock(val, that.topBlock))    bombs++;
				if (that.checkBlock(val, that.leftBlock))   bombs++;
				if (that.checkBlock(val, that.bottomLeft))  bombs++;
				if (that.checkBlock(val, that.bottomBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			 // BLOCKS: 58, 59, 60, 61, 62, 63 (BOTTOM ROW)
			if (parsedVal > 57 && parsedVal < 64){
				if (that.checkBlock(val, that.topLeft))    bombs++;
				if (that.checkBlock(val, that.topBlock))   bombs++;
				if (that.checkBlock(val, that.topRight))   bombs++;
				if (that.checkBlock(val, that.leftBlock))  bombs++;
				if (that.checkBlock(val, that.rightBlock)) bombs++;
				mineSweeper.nonBombs[val]['touchingBombs'] = bombs;
				edges.push(val);
			}

			// ALL MIDDLE BLOCKS 
			if ($.inArray(val, edges) === -1){
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
		
		// PROBABLY SHOULD MOVE THIS TO ITS OWN FUNCTION
		// PLACE NONBOMBS ON THE GAME BOARD
		$.each(this.nonBombs, function(val, num){
			// if (num['touchingBombs'] > 0){
				$('.block'+val).text(num['touchingBombs']);
			// } else {
			// 	$('.block'+val).text('');
			// }
		})
	},
	isItABomb: function(number) { // Register the block as clicked.
	    if ($.inArray(String(number), Object.keys(this.bombs)) != -1){
	    	// console.log(number + "true");
	    	return true;
	    } else {
	    	// console.log(number + "false");
	    	return false;
	    }
	},
	checkBlock: function(value, block){
		var num = parseInt(value) + parseInt(block);
		if ($.inArray(String(num), Object.keys(this.bombs)) != -1) return true;
		return false;
	},
	click: function(blockNumber) {

		// FLAG MODE
		if (this.flagMode === true){ 

			// PLAYER CLICKED A NONBOMB
			if (this.isItABomb(blockNumber) === false){

				// BLOCK IS ACTIVE
				if (this.nonBombs[blockNumber]['active'] === true){

					// BLOCK IS FLAGGED OR UNFLAGGED
					this.flagBlock(blockNumber);
				}

			// PLAYER CLICKED A BOMB
			} else {

				// BLOCK IS FLAGGED OR UNFLAGGED
				this.flagBlock(blockNumber);
			}

		// PLAY MODE
		} else {

			// PLAYER CLICKED A NONBOMB
			if (this.isItABomb(blockNumber) === false){

				// BLOCK IS ACTIVE
				if (this.nonBombs[blockNumber]['active'] === true){

					// BLOCK IS NOT FLAGGED
					if (this.nonBombs[blockNumber]['flagged'] === false){

						// BLOCK IS REVEALED
			  			$('.block'+blockNumber).css('background', 'white').css('color', 'black');

			  			// BLOCK BECOMES INACTIVE
			  			this.nonBombs[blockNumber].active = false
			  		} 

		  		}

	  		// PLAYER CLICKED A BOMB	
	  		} else {

	  			// BLOCK IS NOT FLAGGED
	  			if (this.bombs[blockNumber]['flagged'] === false){

		  			// GO BOOM
		  			$('.gameContainer').css('background', 'white').css('color','white');
		  		}
	  		}
		}
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
	flagBlock: function(blockNumber) {
		if (this.isItABomb(blockNumber) === false){
			// console.log(blockNumber);
			if (this.nonBombs[blockNumber]['flagged'] === true){
				// console.log(blockNumber);
				$('.block'+blockNumber).removeClass('flagged');
				this.nonBombs[blockNumber]['flagged'] = false;
				this.bombsLeft++;
			} else {
				$('.block'+blockNumber).addClass('flagged');
				this.nonBombs[blockNumber]['flagged'] = true;
				this.bombsLeft--;
			}
		} else {
			if (this.bombs[blockNumber]['flagged'] === true){
				// console.log(this.bombs[blockNumber]['flagged']);
				$('.block'+blockNumber).removeClass('flagged');
				this.bombs[blockNumber]['flagged'] = false;
				this.bombsLeft++;
			} else {
				$('.block'+blockNumber).addClass('flagged');
				// console.log(this.bombs[blockNumber]['flagged']);
				this.bombs[blockNumber]['flagged'] = true;
				this.bombsLeft--;
			}
		}
	},
	// blowOffScreen: function(block) {
		// individual block looks like it's blown off the screen
		// if player lands on a bomb, all blocks blow off the screen.
	// },
	// logPlayersClicks: function() { // Log the blocks the player selected.
	    
	// },
	displayNumberOfBombsLeft: function() { // Updates number of bombs left on board
	   $('.bombs').text(mineSweeper.bombsLeft);
	},
	didYouWin: function() { // checks if the player won
		var nonBombsLeft = 0;
		$.each(this.nonBombs, function(num,val) {
			if (val['active'] === true){
				nonBombsLeft++;
			}
		});
		if (nonBombsLeft === 0){
			return true;
		}
		return false;
	}
	// incorrectClick: function() { // Player clicked a bomb.
	  
	// },
	  
};

$(document).ready(function(){
  	$('.start').on('mousedown', function(){
    	mineSweeper.newGame();
    	for(var i= 0; i < 65; i++){ //$.each(mineSweeper.gameBlocks, function(_,val) {//
	  		(function(i) {
		  		$('.block'+i).on('mouseup', function(){
		  			// console.log(i);
		  			mineSweeper.click(i);
		  			mineSweeper.displayNumberOfBombsLeft();
		  			if ((mineSweeper.didYouWin()) === true){
		  				$('.gameContainer').html('<p class="youWin">YOU WIN!!</p>');
		  			}


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
	  		})(i);
	  	}
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