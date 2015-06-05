$(document).on('ready', function(){

  // Make background full width.
  resetDimensions();

  // Helper functions for hiding and showing elements.
  var hide = function(){
        for (var i = 0; i < arguments.length; i++) {
          arguments[i].addClass('hidden');
        }
      },
      show = function() {
        for (var i = 0; i < arguments.length; i++) {
          arguments[i].removeClass('hidden');
        }
      };

  $('#start').on('click', function(){

    // Take inputs and set appropriate values.
    var settings = {
      rows: $('#rows').val(),
      columns: $('#columns').val(),
      mines: $('#mines').val()
    };

    // Ensure inputs were filled our correctly.
    if (validateInputs(settings)) {

      // Instantiate MineSweeper game object.
      var game = new MineSweeper(settings);

      // Instantiate board object.
      var board = new Board({
        game:                 game,
        view:                 $('#board'),
        minesLeft:            $('#mines-left'),
        newGameButton:        $('#new-game'),
        flagButton:           $('#flag'),
        minesLeftContainer:   $('#mines-left-container'),
      });

      // What to do when a block is clicked.
      // This must be created after the board is built.
      $('.block').on('click', function(e){
        board.click($(this));
      });

      // This will toggle flag mode.
      $('#flag').on('click', function(e){
        board.toggleFlagMode();
      });

      // Keeps the board square.
      $('#board').css('width', $('#columns').val() * 50 + 'px');
      $('#board').css('height', $('#rows').val() * 50 + 'px');
      $('body').css('min-width', $('#columns').val() * 50 + 'px');
      $('body').css('min-height', $('#rows').val() * 50 + 'px');

      // Remove inputs from view.
      // Show game elements.
      hide(
        $('#rows'),
        $('#columns'),
        $('#mines'),
        $('#start')
      );
      show(
        $('#mines-left-container'),
        $('#flag')
      );
    };

  });

  // Allow players to start a new game.
  $('#new-game').on('click', function(){
    show(
      $('#rows'),
      $('#columns'),
      $('#mines'),
      $('#start')
    );
    hide($('#new-game'));
    $('#board').empty();
  });

  // This will ensure the user inputs the correct settings.
  var validateInputs = function(settings){
    if (!settings.rows || !settings.columns || !settings.mines) {
      alert('All fields must be filled out.');
      return false;
    } else if (settings.rows * settings.columns < settings.mines) {
      alert('There are too many mines.');
      return false;
    }
    return true;
  }

});