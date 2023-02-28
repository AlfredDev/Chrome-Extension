chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "content_script.js"});
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "enviar_informacion") {
      chrome.tabs.create({ url: "nueva_pagina.html" }, function(tab) {
        chrome.tabs.executeScript(tab.id, {
          code: 'var informacion = ' + JSON.stringify(request.informacion)
        });
      });
    }
  });
  