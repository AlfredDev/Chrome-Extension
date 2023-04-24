(() => {
    const removeHalfBold = (parentElement) => {
      const boldElements = parentElement.querySelectorAll('b');
      boldElements.forEach(bold => {
        const parent = bold.parentNode;
        while (bold.firstChild) {
          parent.insertBefore(bold.firstChild, bold);
        }
        parent.removeChild(bold);
      });
    };
  
    const ignoreTags = {
      B: true,
      META: true,
      LINK: true,
      SCRIPT: true,
      STYLE: true,
      a: true,
    };
  
    const processDocumentBody = (element) => {
      if (element == null) return;
      if (element.body == undefined) return;
      const collection = element.body.getElementsByTagName("*");
  
      for (let i = 0; collection[i] != undefined; i++) {
        if (ignoreTags[collection[i].nodeName]) continue;
        if (collection[i].nodeType != 1) continue;
        if (collection[i].nodeName == "IFRAME") {
          processDocumentBody(collection[i].contentDocument);
        } else {
          if (collection[i].childNodes.length == 0) continue;
          removeHalfBold(collection[i]);
        }
      }
    };
    
    processDocumentBody(document);
  })();
  