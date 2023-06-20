// script.js
$(document).ready(function() {
  $(window).scroll(function() {
    $(".card").each(function() {
      if ($(this).visible(true)) {
        $(this).addClass("animate");
      }
    });
  });
});

$.fn.visible = function(partial) {
  var $t = $(this),
    $w = $(window),
    viewTop = $w.scrollTop(),
    viewBottom = viewTop + $w.height(),
    _top = $t.offset().top,
    _bottom = _top + $t.height(),
    compareTop = partial === true ? _bottom : _top,
    compareBottom = partial === true ? _top : _bottom;

  return (
    compareBottom <= viewBottom &&
    compareTop >= viewTop
  );
};
