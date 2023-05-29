
function createPopup() {
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'popup';

    const button1 = document.createElement('button');
    button1.innerHTML = '🟡';
    button1.addEventListener('click', function () {
        highlightSelection('yellow');
        removePopup();
    });

    const button2 = document.createElement('button');
    button2.innerHTML = '🟠';
    button2.addEventListener('click', function () {
        highlightSelection('orange');
        removePopup();
    });

    const button3 = document.createElement('button');
    button3.innerHTML = '🟤';
    button3.addEventListener('click', function () {
        highlightSelection('green');
        removePopup();
    });

    popup.appendChild(button1);
    popup.appendChild(button2);
    popup.appendChild(button3);

    document.body.appendChild(popup);


}

function removePopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();

    }
}

function showPopup(x, y) {
    const popup = document.getElementById('popup');
    popup.style.top = y + 'px';
    popup.style.left = x + 'px';
    popup.style.position = 'absolute';
    popup.style.display = 'block';
}

function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type !== 'Control') {
        return document.selection.createRange().text;
    }
    return '';
}

function highlightSelection(color) {
    const selectedText = getSelectedText();
    if (selectedText) {
        chrome.storage.local.set({ 'palabras': selectedText });
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = color;
        range.surroundContents(span);
        window.getSelection().removeAllRanges();
        removePopup();
    }
}

document.addEventListener('mouseup', function (event) {
    const selectedText = getSelectedText();
    if (selectedText) {
        createPopup();
        showPopup(event.pageX, event.pageY);
    } else {
        removePopup();
    }
});


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
