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



// Declara la variable utterance fuera de la función play()
var utterance;

document.addEventListener('DOMContentLoaded', function() {
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  var stopButton = document.getElementById('stopButton');

  playButton.addEventListener('click', play);
  pauseButton.addEventListener('click', pause);
  stopButton.addEventListener('click', stop);

  function play() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'play' });
    });
  }

  function pause() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'pause' });
    });
  }

  function stop() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: 'stop' });
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === 'play') {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      // Verifica si utterance ya existe
      if (utterance) {
        utterance.text = selectedText;
      } else {
        utterance = new SpeechSynthesisUtterance(selectedText);
      }
      speak();
      sendResponse({ result: 'success' });
    } else {
      sendResponse({ result: 'error', message: 'No se ha seleccionado texto.' });
    }
  } else if (request.command === 'pause') {
    pause();
    sendResponse({ result: 'success' });
  } else if (request.command === 'stop') {
    stop();
    sendResponse({ result: 'success' });
  }
});

const cambiarFuente = document.getElementById('aplicar');
cambiarFuente.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/fuente.js']
  }); 
});

function speak() {
  window.speechSynthesis.speak(utterance);
}

function pause() {
  window.speechSynthesis.pause();
}

function stop() {
  window.speechSynthesis.cancel();
}
