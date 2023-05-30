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
    chrome.storage.local.set({ "palabras": selectedText });
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
  var popup = document.createElement("div");
  var bar = document.createElement("div");
  var footer = document.createElement("div");
  var contenido = document.createElement("div");
  var txt = document.createElement("textarea");
  var creaPdf = document.createElement("button");
  var guardar = document.createElement("button");
  var cerrar = document.createElement("button");
  creaPdf.textContent = "Exportar pdf";
  guardar.textContent = "Guardar";
  cerrar.textContent = "X";

  popup.style.position = "fixed";
  popup.style.top = "30%";
  popup.style.left = "90%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.backgroundColor = "#000000";
  popup.style.padding = "10px";
  popup.style.border = "1px solid #FDFDFD";
  popup.style.width = "250px";
  popup.style.height = "310px";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.alignItems = "center";

  bar.style.width = "250px";
  bar.style.height = "32px";
  bar.style.display = "flex";
  bar.style.flexDirection = "row-reverse";

  contenido.style.width = "250px";
  contenido.style.height = "250px";
  contenido.style.display = "flex";
  contenido.style.backgroundColor = "#272727";


  footer.style.width = "250px";
  footer.style.height = "32";
  footer.style.display = "flex";
  footer.style.flexDirection = "row";
  footer.style.justifyContent = "center";

  txt.style.backgroundColor = "#272727";
  txt.style.color = "#FDFDFD";
  txt.style.width = "250px";
  txt.style.height = "250px";
  txt.style.resize = "none";


  guardar.style.backgroundColor = "#C4FE76";
  guardar.style.color = "#000000";
  guardar.style.width = "70px";
  guardar.style.height = "25px";
  guardar.style.alignContent = "center";
  guardar.style.marginTop ="10px";
  guardar.style.marginRight = "10px";
  guardar.style.display = "flex";
  guardar.style.flexDirection = "row";
  guardar.style.alignContent = "center";
  guardar.style.fontFamily = "Roboto, sans-serif";
  guardar.style.fontSize = "15px";
  guardar.style.padding = "none";

  creaPdf.style.backgroundColor = "#C4FE76";
  creaPdf.style.color = "#000000";
  creaPdf.style.width = "100px";
  creaPdf.style.height = "25px";
  creaPdf.style.alignContent = "center";
  creaPdf.style.marginTop = "10px";
  creaPdf.style.marginLeft = "10px";
  creaPdf.style.display = "flex";
  creaPdf.style.flexDirection = "row";
  creaPdf.style.alignContent = "center";
  creaPdf.style.fontFamily = "Roboto, sans-serif";
  creaPdf.style.fontSize = "15px";
  creaPdf.style.padding = "none";


  cerrar.style.backgroundColor = "red";
  cerrar.style.color = "#FDFDFD";
  cerrar.style.width = "15";
  cerrar.style.height = "25px";
  cerrar.style.alignContent = "center";
  cerrar.style.marginBottom = "10px";
  cerrar.style.display = "flex";
  cerrar.style.flexDirection = "row";
  cerrar.style.alignContent = "center";
  cerrar.style.fontFamily = "Roboto, sans-serif";
  cerrar.style.fontSize = "15px";
  cerrar.style.padding = "none";

  chrome.storage.local.get(["palabras"], function (resultado) {
    if (resultado.palabras) {
      txt.innerHTML = resultado.palabras;
    }
  });

  guardar.addEventListener("click", () => {
    const content = txt.value;
    chrome.storage.local.set({ "palabras": content });
  });

  creaPdf.addEventListener("click", () => {
    const content = txt.value;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(
      `<html><head><title>PDF</title></head><body>${content}</body></html>`
    );
    printWindow.document.addEventListener("load", function () {
      printWindow.print();
    });
  });

  cerrar.addEventListener("click", () => {
    popup.remove();
  });

  bar.appendChild(cerrar);
  contenido.appendChild(txt);
  footer.appendChild(guardar);
  footer.appendChild(creaPdf);

  popup.appendChild(bar);
  popup.appendChild(contenido);
  popup.appendChild(footer);

  document.body.appendChild(popup);
}

// Recibe mensajes de la extensión y realiza las acciones correspondientes
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "play") {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
      speak(selectedText);
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
    pause();
    stop();
    sendResponse({ result: "success" });
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
