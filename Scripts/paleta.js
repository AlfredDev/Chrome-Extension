(() => {
let main = document.querySelector('main');
main.style.backgroundColor="#ECFCC7";

// Obtener todos los elementos de texto de la página
const elementosTexto = document.querySelectorAll('body, p, span, h1, h2, h3, h4, h5, h6, main,aside,article,nav,header');

// Recorrer cada elemento de texto y cambiarle el color
elementosTexto.forEach(elemento => {
  // Obtener el contenido de texto del elemento
  const texto = elemento.value;
  texto.style.fontFamily = 'Arial, sans-serif';
  
  // Cambiar el color de texto del elemento
  elemento.style.color = '#131313'; // Por ejemplo, rojo (#FF0000)
});
})();


