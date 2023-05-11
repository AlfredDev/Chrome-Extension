// function getSelectedText() {
//     if (window.getSelection) {
//       return window.getSelection().toString();
//     } else if (document.selection && document.selection.type != 'Control') {
//       return document.selection.createRange().text;
//     }
//     return '';
//   }

//   function highlightSelection() {
//     const selectedText = getSelectedText();
//     const range = window.getSelection().getRangeAt(0);
//     const span = document.createElement('span');
//     span.style.backgroundColor = 'yellow';
//     range.surroundContents(span);
//   }

//   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === 'highlight') {
//       highlightSelection();
//     }
//   });
function createButton() {
    const button = document.createElement('button');
    button.className = 'highlight-button';
    button.innerHTML = '🧹';
    document.body.appendChild(button);
    button.addEventListener('click', highlightSelection);
}

function removeButton() {
    const button = document.querySelector('.highlight-button');
    if (button) {
        button.remove();
    }
}

function getSelectedText() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection && document.selection.type != 'Control') {
        return document.selection.createRange().text;
    }
    return '';
}

function highlightSelection() {
    const selectedText = getSelectedText();
    if (selectedText) {
        const range = window.getSelection().getRangeAt(0);
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        range.surroundContents(span);
        removeButton();
    }
}

document.addEventListener('mouseup', function (event) {
    const selectedText = getSelectedText();
    if (selectedText) {
        createButton();
        const button = document.querySelector('.highlight-button');
        button.style.top = event.pageY + 'px';
        button.style.left = event.pageX + 'px';
    } else {
        removeButton();
    }
});

