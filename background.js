/*function blockAds() {
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.url.includes('.ad') || details.url.includes('advertising')) {
        return { cancel: true };
      }
    },
    { urls: ['https://www.googleadservices.com'] },
    ['blocking']
  );

  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      var blockedUrls = ['https://www.googleadservices.com/', 'https://www.googleadservices.com/pagead/'];
      if (blockedUrls.includes(details.url)) {
        return { cancel: true };
      }
    },
    { urls: ['<all_urls>'] },
    ['blocking']
  );
}

chrome.runtime.onInstalled.addListener(function() {
  blockAds();
});
*/