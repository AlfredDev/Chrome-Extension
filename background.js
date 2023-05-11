let popupWindow = null;

chrome.browserAction.onClicked.addListener(() => {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.focus();
  } else {
    const width = 300;
    const height = 80;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    popupWindow = window.open(
      'https://open.spotify.com/embed/playlist/05OkqemhVmD27zXfdnyNsy',
      'Spotify Ambient Player',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
    );
  }
});
