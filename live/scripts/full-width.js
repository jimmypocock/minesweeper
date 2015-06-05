/*

This allows the background to be the full height
of the window.

*/

var resetDimensions = function() {
  var winHeight = $(window).height();
  $('body').css('height', winHeight + 'px');
};

$(window).on('resize', resetDimensions);