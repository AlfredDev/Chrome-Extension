export function button() {
    var button = document.createElement("button");
    button.classList.add('dic')
    button.innerHTML = 'D'
    button.id = "definition-button";
    button.style.display = "block";
    button.style.position = "fixed";
    button.style.padding = "10px";
    button.style.backgroundImage = "url('/img/dic.png')";
    button.style.borderRadius = "10px";
    button.style.backgroundSize = "cover";
    button.style.top = (event.clientY + 10) + "px";
    button.style.left = (event.clientX + 10) + "px";
    return button;
}