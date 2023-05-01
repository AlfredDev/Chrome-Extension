document.addEventListener("mouseup", function (event) {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText !== "" && selectedText.length <= 20 && selectedText.length >= 4) {
        var button = document.createElement("button");
        button.classList.add('dic')
        button.innerHTML = '| | |'
        button.id = "definition-button";
        button.style.display = "block";
        button.style.position = "fixed";
        button.style.padding = "8px";
        button.style.backgroundImage = "url('/dic.png')";
        button.style.borderRadius = "15px";
        button.style.backgroundSize = "cover";
        button.style.backgroundColor = "black"
        button.style.color = 'white';
        button.style.zIndex = '9999';
        button.style.top = (event.clientY + 10) + "px";
        button.style.left = (event.clientX + 10) + "px";
        document.body.appendChild(button);
        button.addEventListener("click", function () {
            // Aquí puedes agregar la lógica para mostrar la definición de la palabra
            alert("Definición de " + selectedText);
            button.remove();
        });
        document.addEventListener("mouseup", function (event) {
            var unselectedText = window.getSelection().toString().trim();
            if (unselectedText === "") {
                button.remove();
            }
        });
    }
});
