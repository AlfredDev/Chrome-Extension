(() => { 
        // Tu código JavaScript aquí
  const body = document.querySelector('body');
  //const fontSelect = document.getElementById;
  //const selectedFont = fontSelect.value;
  
  body.style.fontFamily = "Courier New, monospace";

  const elements = document.querySelectorAll('h1, h2, h3, p');
  elements.forEach((element) => {
    element.style.fontFamily = "Courier New, monospace";
  });
})();