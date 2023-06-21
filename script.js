$(document).ready(function() {
  // Load timeline data from JSON file
  $.getJSON('timeline.json', function(data) {
    var events = data.events;
    var timelineNav = $('#timeline-nav');
    var timelineColumn = $('#timeline-column');

    // Generate timeline navigation
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var timelineNavItem = $('<a>', {
        href: '#' + event.id,
        text: event.date,
        class: 'timeline-nav-item'
      });
      timelineNav.append(timelineNavItem);
    }

    // Generate timeline cards
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var card = $('<div>', {
        id: event.id,
        class: 'card ' + (i % 2 === 0 ? 'even' : 'odd')
      });

      var cardContent = $('<div>', { class: 'card-content' });

      var cardDate = $('<div>', { class: 'card-date', text: event.date });
      var cardTitle = $('<div>', { class: 'card-text-title', text: event.title });

      cardContent.append(cardDate);
      cardContent.append(cardTitle);
      card.append(cardContent);

      // Add click event to card to show event details
      card.click(function() {
        var eventId = $(this).attr('id');
        var clickedEvent = events.find(function(event) {
          return event.id === eventId;
        });
        showEventDetails(clickedEvent);
      });

      timelineColumn.append(card);
    }
  });

  // Show event details
  function showEventDetails(event) {
    var eventDetails = $('#eventDetails');
    var eventDetailsContent = $('#eventDetailsContent');

    // Populate event details content
    eventDetailsContent.html('');
    var eventDetailsTitle = $('<h2>', { text: event.title });
    var eventDetailsDescription = $('<div>', { html: event.longDescription });
    var eventDetailsHashtags = $('<div>', { text: 'Hashtags: ' + event.hashtags.join(', ') });
    eventDetailsContent.append(eventDetailsTitle);
    eventDetailsContent.append(eventDetailsDescription);
    eventDetailsContent.append(eventDetailsHashtags);

    // Show event details
    eventDetails.removeClass('hidden');

    // Hide event details when close button is clicked
    $('#closeButton').click(function() {
      eventDetails.addClass('hidden');
    });
  }

  // Search events by hashtag
  $('#searchInput').keyup(function() {
    var searchValue = $(this).val().toLowerCase();
    $('.card').each(function() {
      var cardHashtags = $(this).find('.card-text-body').data('hashtags');
      var cardMatchesSearch = cardHashtags.some(function(hashtag) {
        return hashtag.toLowerCase().includes(searchValue);
      });
      $(this).toggle(cardMatchesSearch);
    });
  });
});
