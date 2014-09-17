****************************
Overview & Credit
****************************

Minus the fact that MineSweeper is a game originating in the 1960's (as my father would say, "Before [I] was even a dirty thought") and the fact that the game itself was made by someone completely different and has evolved without my help, this is an original product. I mean to say, the code itself was not copied from a source and input into this document. This was a learning experience for me, so that would've defeated the purpose if I did that. That said, I believe ideas and inspiration are always worth giving credit to:

• Microsoft - I played this game for hours on Windows 98, so thanks Billy and team for that.

• The people who created the game and catered to its evolution for the past few decades - http://en.wikipedia.org/wiki/Minesweeper_(video_game) - thanks a milli.

• Dan Purdy's Simon Says game tutorial was pretty instrumental in giving me the courage to build a JavaScript game on my own. The tutorial can be found on his site - http://www.danpurdy.co.uk/tutorial/simon-says-game-in-jquery-tutorial/ - I recommend you check it out, share it, and give him some accolades for it.

• I found the box shadow effect on Paul Underwood's site - http://www.paulund.co.uk/creating-different-css3-box-shadows-effects - I changed it quite a bit over time I believe, but it's still a great help.

• I can't for the life of me find where I pulled the rainbow css code from. I even googled the code itself and couldn't find it. Nonetheless, it was a great help. You can find multiple resources on linear gradients and color stops by googling just that or rainbow css (or by looking at the appropriate css fill/script tag within this repo).

****************************
Notes:
****************************

DELETE KEYWORD

** Bugs:

FIXED • Block 57 is not populating the correct number (check if conditionals in eachBlocksSurroundings() **SIDENOTE** change name (eachBlocksSurroundings)

** Future Implementation

CSS:
• Create Explosion animation for each block
• Create Explosion animation for entire board when bomb is clicked.

JS:
• Update flagMode
• Update bombsLeft
• Open connecting 0 blocks after each click.

** Layout of game object:

mineSweeper = {
	<!-- active: BOOLEAN, -->
	<!-- handler: BOOLEAN, -->
	gameBlocks: ARRAY (NUMBERS 1 - 64),
	bombs: ARRAY,
	nonBombs: OBJECT (KEY = BLOCK NUMBER, VALUE = BOMBS TOUCHING IT),
	<!-- playerClicks: ARRAY, -->
	<!-- flagMode: BOOLEAN, -->
	<!-- bombsLeft: INTEGER, -->
	<!-- init: FUNCTION, -->
	<!-- initBlockHandler: FUNCTION, -->
	newGame: FUNCTION,
	isItABomb: FUNCTION,
	randomizeBombs: FUNCTION,
	<!-- checkTopLeftBlock: FUNCTION, -->
	dropBombs: FUNCTION,
	populateNonBombs: FUNCTION,
	eachBlocksSurroundings: FUNCTION,
	<!-- flagBlock: FUNCTION, -->
	<!-- blowOffScreen: FUNCTION, -->
	<!-- logPlayerClicks: FUNCTION, -->
	<!-- checkBlock: FUNCTION, -->
	<!-- displayNumberOfBombsLeft: FUNCTION, -->

}

****************************
Scratch Pad
****************************

mineSweeper = {
	nonBombs = {
		# = {
			active/clicked/uncovered: BOOLEAN,
			blocksNextToIt: ARRAY,
			flagged: BOOLEAN
		}
	}
}

To make a bomb explode, i could add 9 figures within each block div. each figure has a different color of the rainbow and when the div is clicked, the figures disperse off the side of the screen, and the div is left with a white background.










