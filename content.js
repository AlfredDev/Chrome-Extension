function createPopup() {
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.className = "popup";

  const button1 = document.createElement("button");
  button1.innerHTML = "🟡";
  button1.addEventListener("click", function () {
    highlightSelection("yellow");
    removePopup();
  });

  const button2 = document.createElement("button");
  button2.innerHTML = "🟠";
  button2.addEventListener("click", function () {
    highlightSelection("orange");
    removePopup();
  });

  const button3 = document.createElement("button");
  button3.innerHTML = "🟤";
  button3.addEventListener("click", function () {
    highlightSelection("brown");
    removePopup();
  });

  popup.appendChild(button1);
  popup.appendChild(button2);
  popup.appendChild(button3);

  document.body.appendChild(popup);
}

function removePopup() {
  const popup = document.querySelector(".popup");
  if (popup) {
    popup.remove();
  }
}

function showPopup(x, y) {
  const popup = document.getElementById("popup");
  popup.style.top = y + "px";
  popup.style.left = x + "px";
  popup.style.position = "absolute";
  popup.style.display = "block";
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function getSelectedText() {
  if (window.getSelection) {
    return window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    return document.selection.createRange().text;
  }
  return "";
}

function highlightSelection(color) {
  const selectedText = getSelectedText();
  if (selectedText) {
    chrome.storage.local.set({ palabras: selectedText });
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement("span");
    span.style.backgroundColor = color;
    range.surroundContents(span);
    window.getSelection().removeAllRanges();
    removePopup();
  }
}

document.addEventListener("mouseup", function (event) {
  const selectedText = getSelectedText();
  if (selectedText) {
    createPopup();
    showPopup(event.pageX, event.pageY);
  } else {
    removePopup();
  }
});

function paleta() {}

// Escucha un atajo de teclado (por ejemplo, Ctrl + Shift + N) para abrir una nota rápida
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.shiftKey && event.code === "KeyL") {
    event.preventDefault();
    openNotePopup();
  }
});

function openNotePopup() {
  //var scriptElement = document.createElement("script");
  //scriptElement.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js";
  //document.head.appendChild(scriptElement);
  var popup = document.createElement("div");
  var txt = document.createElement("textarea");
  var creaPdf = document.createElement("button");
  creaPdf.textContent = "Exportar pdf";
  popup.style.position = "fixed";
  popup.style.top = "30%";
  popup.style.left = "90%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "white";
  popup.style.padding = "10px";
  popup.style.border = "1px solid black";
  popup.style.width = "250px";
  popup.style.height = "300px";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.alignItems = "center";

  txt.style.width = "250px";
  txt.style.height = "250px";
  txt.style.resize = "none";

  creaPdf.style.marginBottom = "10px";

  chrome.storage.local.get(["palabras"], function (resultado) {
    if (resultado.palabras) {
      txt.innerHTML = resultado.palabras;
    }
  });

  creaPdf.addEventListener("click", () => {
    /*
  const content = txt.value;
  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`<html><head><title>PDF</title></head><body>${content}</body></html>`);
  printWindow.document.addEventListener('load', function() {
  printWindow.print();
  });*/
    // 1. Send a message to the service worker requesting the user's data
    chrome.runtime.sendMessage(txt.value, (response) => {
      // 3. Got an asynchronous response with the data from the service worker
      console.log("Respuesta del background", response);
      //initializeUI(response);
    });
  });

  popup.appendChild(creaPdf);
  popup.appendChild(txt);
  document.body.appendChild(popup);
}



// Recibe mensajes de la extensión y realiza las acciones correspondientes
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === 'play') {
        var selectedText = window.getSelection().toString();
        if (selectedText.length > 0) {
            speak(selectedText);
            sendResponse({ result: 'success' });
        } else {
            sendResponse({ result: 'error', message: 'No se ha seleccionado texto.' });
        }
    } else if (request.command === 'pause') {
        pause();
        sendResponse({ result: 'success' });
    } else if (request.command === 'stop') {
        pause();
        stop();
        sendResponse({ result: 'success' });
    }
});

// Utiliza la API de SpeechSynthesis para leer el texto en voz alta
function speak(text) {
    var utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

function pause() {
    window.speechSynthesis.pause();
}

function stop() {
    window.speechSynthesis.cancel();
}