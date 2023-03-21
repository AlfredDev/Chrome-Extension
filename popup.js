let fastBtn = document.getElementById('fast');
let fastBtnsss = document.getElementById('adios');


fastBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/readable_text.js']
  });
});


fastBtnsss.addEventListener('click', async () => {
  alert('Remo SOlo')
})