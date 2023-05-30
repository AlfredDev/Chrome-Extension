(() => {
const audio = document.createElement('audio');
function creaAudio(){
      audio.src="../audio/aud.mp3";
      console.log("creo audio")

}


function playVid() {
    audio.play();
}

function pauseVid() {
    audio.pause();
}
creaAudio();
playVid();
})();