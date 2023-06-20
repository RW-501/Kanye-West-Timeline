// script.js
$(document).ready(function() {
  $.getJSON("timeline.json", function(data) {
    var timelineEvents = data.events;
    var $timelineColumn = $("#timeline-column");
    var $timelineNav = $("#timeline-nav");

    $.each(timelineEvents, function(index, event) {
      var isOdd = index % 2 === 0;
      var $card = $("<div>").addClass("card").addClass(isOdd ? "odd" : "even");
      var $cardBorder = $("<div>").addClass("card-border");
      var $cardLineContainer = $("<div>").addClass("card-line-container");
      var $cardLine = $("<div>").addClass("card-line");
      var $cardLineCircle = $("<div>").addClass("card-line-circle");

      var $cardDate = $("<div>").addClass("card-date").text(event.date);
      var $cardText = $("<div>").addClass("card-text");
      var $cardTextTitle = $("<div>").addClass("card-text-title").text(event.title);
      var $cardTextBody = $("<div>").addClass("card-text-body").html(event.description);

      $cardText.append($cardTextTitle, $cardTextBody);
      $cardBorder.append($cardDate, $cardText);
      $cardLineContainer.append($cardLine, $cardLineCircle);
      $card.append($cardBorder, $cardLineContainer);
      $timelineColumn.append($card);

      var $timelineNavItem = $("<span>")
        .addClass("timeline-nav-item")
        .text(event.date)
        .attr("data-id", event.id);
      $timelineNav.append($timelineNavItem);
    });

    $(window).scroll(function() {
      $(".card").each(function() {
        if ($(this).visible(true)) {
          $(this).addClass("animate");
        }
      });
    });

    $(".timeline-nav-item").on("click", function() {
      var targetId = $(this).attr("data-id");
      var targetElement = $("#" + targetId);

      if (targetElement.length > 0) {
        $("html, body").animate({
          scrollTop: targetElement.offset().top
        }, 800);
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
