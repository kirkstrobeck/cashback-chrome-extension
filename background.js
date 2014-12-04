searchDealItems = function (url) {
  var domain = url.match(/(.*:\/\/.*\.)(.*\.[a-z]*)\//);
  var results = $.grep(dealItems, function (item) {
    return item.search === domain[2]
  });
  console.log(results[0]);
  saveOnCurrentPageNotification(results[0]);
};

var saveOnCurrentPageNotification = function (item) {

  chrome.notifications.create('', {
    type: 'basic',
    title: 'Get cash back from ' + item.title,
    iconUrl: 'logo.png',
    message: 'Click to get up to X% back at ' + item.title
  }, function () {});

  chrome.notifications.onClicked.addListener(function () {
    window.open(item.dubliProfile);
  });
};

chrome.history.onVisited.addListener(function (currentPage) {
  console.log(currentPage.url);
  searchDealItems(currentPage.url);
});
