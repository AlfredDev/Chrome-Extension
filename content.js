function createPopup() {
  const popup = document.createElement('div');
  popup.id = 'popup';
  popup.className = 'popup';
  
  const button1 = document.createElement('button');
  button1.innerHTML = '🟡';
  button1.addEventListener('click', function() {
    highlightSelection('yellow');
    removePopup();
  });
  
  const button2 = document.createElement('button');
  button2.innerHTML = '🔵';
  button2.addEventListener('click', function() {
    highlightSelection('blue');
    removePopup();
  });
  
  const button3 = document.createElement('button');
  button3.innerHTML = '🟢';
  button3.addEventListener('click', function() {
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


