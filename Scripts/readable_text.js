(() => {
  //Insercion del nodo
  const insertAfter = (newNode, existingNode) => {
    if (existingNode.nextSibling != undefined)
      existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    else
      existingNode.parentNode.appendChild(newNode);
  }

  const HalfBold = (parentElement) => {
    for (var i = 0; parentElement.childNodes[i] != undefined; i++) {
      if (parentElement.childNodes[i].nodeName == "#text" &&
        parentElement.childNodes[i].textContent.trim().length != 0
      ) {
        var recentNode = parentElement.childNodes[i];
        var newNodeCount = 0;
        parentElement.childNodes[i].textContent.split(/(\s+|\S+)/).forEach(
          word => {
            if (word.length == 0) return;
            var trimmedWordLength = word.trim().length;
            if (trimmedWordLength == 0) {
              var textNode = document.createTextNode(word);
              insertAfter(textNode, recentNode);
              newNodeCount++;
              recentNode = textNode;
              return;
            }

            var length = Math.floor(trimmedWordLength / 2);
            if (length == 0) length = 1;

            const bold = document.createElement('b');
            bold.innerHTML = word.slice(0, length);
            bold.style.fontSize = "larger"; //  para aumentar el tamaño de letra
            insertAfter(bold, recentNode);
            newNodeCount++;
            recentNode = bold;



            if (word.length == 1) return;
            var textNode = document.createTextNode(word.slice(length));
            insertAfter(textNode, recentNode);
            newNodeCount++;
            recentNode = textNode;
          });
        parentElement.removeChild(parentElement.childNodes[i]);
        i += newNodeCount - 1;
      }
    }
  };

  var ignoreTags = {
    B: true,
    META: true,
    LINK: true,
    SCRIPT: true,
    STYLE: true,
  };

  const processDocumentBody = (element) => {
    if (element == null) return;
    if (element.body == undefined) return;
    var collection = element.body.getElementsByTagName("*");

    for (var i = 0; collection[i] != undefined; i++) {
      if (ignoreTags[collection[i].nodeName]) continue;
      if (collection[i].nodeType != 1) continue;
      if (collection[i].nodeName == "IFRAME") {
        processDocumentBody(collection[i].contentDocument);
      } else {
        if (collection[i].childNodes.length == 0) continue;
        HalfBold(collection[i]);
      }
    }
  };
  processDocumentBody(document);  
})();