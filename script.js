$(document).ready(function() {
  // Load event data from JSON file
  $.getJSON("timeline.json", function(data) {
    console.log("Data loaded:", data);
    var events = data.events;
    var timelineNav = $("#timeline-nav");
    var timelineColumn = $("#timeline-column");

    // Generate timeline navigation
    events.forEach(function(event) {
      timelineNav.append('<a href="#' + event.id + '">' + event.date + '</a>');
    });

    // Generate timeline cards
    events.forEach(function(event, index) {
      var card = $('<div class="card"></div>');
      card.addClass(index % 2 === 0 ? "left" : "right");
      card.attr("id", event.id);
      card.append('<div class="card-date">' + event.date + '</div>');
      card.append('<div class="card-text"><div class="card-text-title">' + event.title + '</div></div>');
      timelineColumn.append(card);

      card.click(function() {
        showEventDetails(event);
      });
    });

    // Handle search functionality
    $("#search-input").on("input", function() {
      var searchTerm = $(this).val().toLowerCase();
      $(".card").each(function() {
        var cardText = $(this).find(".card-text").text().toLowerCase();
        if (cardText.includes(searchTerm)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });

    // Handle navigation scrolling
    timelineNav.find("a").click(function(e) {
      e.preventDefault();
      var targetId = $(this).attr("href");
      var targetOffset = $(targetId).offset().top;
      $("html, body").animate({ scrollTop: targetOffset }, 500);
    });

    // Event details modal
    var modal = $("#event-details-modal");
    var modalContent = $(".modal-content");
    var closeModal = $(".close");

    closeModal.click(function() {
      modalContent.removeClass("show");
    });

    function showEventDetails(event) {
      modal.find(".event-details-date").text(event.date);
      modal.find(".event-details-title").text(event.title);
      modal.find(".event-details-description").html(event.longDescription);
      modalContent.addClass("show");
    }
  }).fail(function(jqxhr, textStatus, error) {
    console.log("Error loading JSON file:", textStatus, error);
  });
});
