
$('.menu-burger').click( function() {
    $('.bar').toggleClass('animate'); // Creates the Hamburger -> X Animation on first click
    $('.overlay').fadeToggle(100, 'linear'); // toggles open the nav overlay // Optionally could change fadeIn & fadeut to both toggleClass
    $('.menu-options-list').delay(100).addClass('slideDownIn');	// Rapidly fades option in upward into place
});
console.log("OK");