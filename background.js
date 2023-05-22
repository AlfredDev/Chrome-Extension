chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.mensaje === "¡Hola desde el botón!") {
    prueba();
    //sendResponse("Mensaje recibido en el background.");
  }
});


function prueba(){

  console.log("prueba");
}
