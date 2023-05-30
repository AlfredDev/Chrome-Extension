/*import { jsPDF } from "jspdf";
const { jsPDF } = window.jspdf;
*/

let fastBtn = document.getElementById("fast");
let revertBtn = document.getElementById("restaurar");

// al abrir el popup, lee el estado del botón del almacenamiento local y establece fastBtn.disabled en consecuencia
chrome.storage.local.get("isFastEnabled", function (data) {
  if (data.isFastEnabled) {
    fastBtn.disabled = true;
  } else {
    fastBtn.disabled = false;
  }
});

fastBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["/Scripts/readable_text.js"],
  });

  // al hacer clic en el botón "Fast", guarda el estado del botón en el almacenamiento local
  chrome.storage.local.set({ isFastEnabled: true });
  fastBtn.disabled = true;
});

revertBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["/Scripts/revert_readable_text.js"],
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

const temaOscuro = document.getElementById("paleta");
temaOscuro.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["/Scripts/paleta.js"],
  });
});

const temaCalido = document.getElementById("tema_calido");
temaCalido.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["/Scripts/tema_calido.js"],
  });
});
/*
document.getElementById("m").addEventListener("click", function () {
  var reproductor = document.getElementById("reproductor");
  reproductor.play();
});


const btnPlay = document.getElementById('m');
btnPlay.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/musica.js']
  });
});*/

// Declara la variable utterance fuera de la función play()
var utterance;

document.addEventListener("DOMContentLoaded", function () {
  var playButton = document.getElementById("playButton");
  var pauseButton = document.getElementById("pauseButton");
  var stopButton = document.getElementById("stopButton");

  playButton.addEventListener("click", play);
  pauseButton.addEventListener("click", pause);
  stopButton.addEventListener("click", stop);

  function play() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "play" });
    });
  }

  function pause() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "pause" });
    });
  }

  function stop() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { command: "stop" });
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "play") {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      // Verifica si utterance ya existe
      if (utterance) {
        utterance.text = selectedText;
      } else {
        utterance = new SpeechSynthesisUtterance(selectedText);
      }
      speak();
      sendResponse({ result: "success" });
    } else {
      sendResponse({
        result: "error",
        message: "No se ha seleccionado texto.",
      });
    }
  } else if (request.command === "pause") {
    pause();
    sendResponse({ result: "success" });
  } else if (request.command === "stop") {
    stop();
    sendResponse({ result: "success" });
  }
});

const timesRoman = document.getElementById('times');
timesRoman.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/fuente.js']
  }); 
});

const arial = document.getElementById('arial');
arial.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/arial.js']
  }); 
});

const courier = document.getElementById('courier');
courier.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['/Scripts/courier.js']
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

/*const btnPdf = document.getElementById("pdf");
btnPdf.addEventListener("click", () => {
  // Default export is a4 paper, portrait, using millimeters for units
  //const doc = new jsPDF();
  var doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  doc.save("a4.pdf");
});
*/