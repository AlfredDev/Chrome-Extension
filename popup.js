let fastBtn = document.getElementById('fast');
let revertBtn = document.getElementById('restaurar');

// al abrir el popup, lee el estado del botón del almacenamiento local y establece fastBtn.disabled en consecuencia
chrome.storage.local.get('isFastEnabled', function (data) {
  if (data.isFastEnabled) {
    fastBtn.disabled = true;
  } else {
    fastBtn.disabled = false;
  }
});

fastBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/readable_text.js']
  });

  // al hacer clic en el botón "Fast", guarda el estado del botón en el almacenamiento local
  chrome.storage.local.set({ isFastEnabled: true });
  fastBtn.disabled = true;
});

revertBtn.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/revert_readable_text.js']
  });

  // al hacer clic en el botón "Revertir", guarda el estado del botón en el almacenamiento local
  chrome.storage.local.set({ isFastEnabled: false });
  fastBtn.disabled = false;
});

// document.getElementById('highlight').onclick = function () {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { action: 'highlight' });
//   });
// };



