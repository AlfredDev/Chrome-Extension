chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({ url: 'https://open.spotify.com/playlist/05OkqemhVmD27zXfdnyNsy' });
  });