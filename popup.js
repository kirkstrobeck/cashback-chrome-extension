var historySuccessMessage = '';

var searchHistory = function () {
  var i = 0;
  for (i in dealItems) {
    searchHistoryForItem(dealItems[i]);
  }
};

var searchHistoryForItem = function (item) {
  chrome.history.search({
    text: item.search
  }, function (HistoryItem) {
    if (HistoryItem[0]) {
      historySuccessMessage += '' +
        '<li>' +
        '<a target="_blank" href="' + item.dubliProfile + '">' +
        item.title + '</a>' +
        '</li>';
    }

    if (item.title === 'Apple') {
      displayHistorySuccessMessage();
    }
  });
};

var displayHistorySuccessMessage = function () {
  console.log(historySuccessMessage);
  if (historySuccessMessage.length) {
    historySuccessMessage = '<h2>Save where you already shop!</h2>' +
      '<ul>' + historySuccessMessage + '</ul>';

    $('#historySearch').html(historySuccessMessage);
  }
};

$(document).ready(searchHistory);
