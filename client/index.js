const synth = window.speechSynthesis;
const requireBtn = false;
let body = document.getElementsByTagName("body")[0];
let startBtn = document.getElementById("startBtn");
let header = document.createElement("h1");
header.className = "lyrics";
body.appendChild(header);

if(!requireBtn){
    startBtn.remove();
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let txt = getParameterByName("txt");

function speakWord(word, pitch){
    voices = synth.getVoices();
    var utterThis = new SpeechSynthesisUtterance(word);
    utterThis.pitch = pitch;
    utterThis.rate = 1.5;
    utterThis.voice = voices[6];
    synth.speak(utterThis);

    
    utterThis.onstart = () => {
        header.innerText = txt;
    }
    utterThis.onend = () => {
        header.innerText = "";
    }

    return utterThis;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /*
function speak(){
    let words = txt.split(" ");
    header.innerText = txt;
    for(let i = 0; i < words.length; i++){
        let word = words[i];
        let utterance = speakWord(word, 0.5 + getRandomInt(1.5));

        if(i == words.length - 1){
            utterance.onend = () => {
                header.innerText = "";
            }
        }
    }
}
*/
function speak(){
    voices = synth.getVoices();
    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.pitch = 1;
    utterThis.rate = 1;
    utterThis.voice = voices[6];
    synth.speak(utterThis);

    
    utterThis.onstart = () => {
        header.innerText = txt;
    }
    utterThis.onend = () => {
        header.innerText = "";
    }

    return utterThis;
}

function start(){
    startBtn.remove();
    let audio = new Audio('/music.mp3')
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
    setInterval(() => {
        speak();
    }, 1000)
}
if(requireBtn){
    startBtn.onclick = start
}
else{
    start();
}
