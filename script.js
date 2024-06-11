// Nicolas Cutrone

let periodo = 0;
let team1Goalsadd = 0;
let team1GoalsRest =0;
let team2GoalsRest =0;
let team2Goals = 0;
let team1Fouls = 0;
let team2Fouls = 0;
let gameTimeMinutes = 0;
let timer = null;
let timeRemaining = 0;



const timeInput = document.getElementById('timeInput');
const setTimeButton = document.getElementById('setTimeButton');
const startPauseButton = document.getElementById('startPauseButton');
const timeDisplay = document.getElementById('timeDisplay');
const resetButton = document.getElementById('reset');

const team1GoalsLabel = document.querySelector('#team1 .goals');
const team2GoalsLabel = document.querySelector('#team2 .goals');
const team1FoulsLabel = document.querySelector('#team1 .fouls');
const team2FoulsLabel = document.querySelector('#team2 .fouls');

team2GoalsLabel.className = 'goals';

setTimeButton.addEventListener('click', () => {
    gameTimeMinutes = parseInt(timeInput.value);
    if (isNaN(gameTimeMinutes) || gameTimeMinutes <= 0) {
        alert('Por favor introduzca en valor valido.');
        return;
    }
    timeRemaining = gameTimeMinutes * 60 * 1000;
    updateTimeDisplay();
  
});
// ////  Reset valores
resetButton.addEventListener('click', () => {
    periodo=0;
    team1Goalsadd=0;
    team2Goals=0;
   team1Fouls=0;
  team2Fouls=0;
    team1FoulsLabel.textContent = `Faltas: ${team1Fouls}`;
  team2FoulsLabel.textContent = `Faltas: ${team2Fouls}`;
    team2GoalsLabel.textContent = `GOLES: ${team2Goals}`;
    document.getElementById("periodo").innerText = periodo;
    team1GoalsLabel.textContent = `GOLES: ${team1Goalsadd}`;
    timeRemaining=0;
    updateTimeDisplay();
});

startPauseButton.addEventListener('click', () => {
    if (!timer) {
        startTimer();
    } else {
        pauseTimer();
    }
});

Bocina.addEventListener('click', () => {
   // beep();
  reproducirAudio("HornBasket");
});

//**
  
function cambiarPeriodo(cambio) {
            periodo += cambio;
            if (periodo<0)  periodo = 0;
           document.getElementById("periodo").innerText = periodo;
           
  // actualizarBotones();
 }
function actualizarBotones() {
           document.getElementById("decrementar").disabled = periodo <= 0;
}

        actualizarBotones();
//**

document.querySelector('#team1 .goalButtonAdd').addEventListener('click', () => {
    team1Goalsadd++;
    team1GoalsLabel.textContent = `GOLES: ${team1Goalsadd}`;
});
document.querySelector('#team1 .goalButtonRest').addEventListener('click', () => {
  if (team1Goalsadd>0) {
    team1Goalsadd--;
  }
    team1GoalsLabel.textContent = `GOLES: ${team1Goalsadd}`;
});

document.querySelector('#team2 .goalButtonRest2').addEventListener('click', () => {
     if (team2Goals>0) { team2Goals--};
    team2GoalsLabel.textContent = `GOLES: ${team2Goals}`;
});

document.querySelector('#team1 .foulButton').addEventListener('click', () => {
    team1Fouls++;
    team1FoulsLabel.textContent = `Faltas: ${team1Fouls}`;
});

document.querySelector('#team1 .foulButtonMinos').addEventListener('click', () => {
     if (team1Fouls>0) team1Fouls--;
    team1FoulsLabel.textContent = `Faltas: ${team1Fouls}`;
});

document.querySelector('#team2 .goalButton').addEventListener('click', () => {
    team2Goals++;
    team2GoalsLabel.textContent = `GOLES: ${team2Goals}`;
});



document.querySelector('#team2 .foulButton').addEventListener('click', () => {
    team2Fouls++;
    team2FoulsLabel.textContent = `Faltas: ${team2Fouls}`;
});

document.querySelector('#team2 .foulButtonMenos').addEventListener('click', () => {
    if (team2Fouls>0) team2Fouls--;
    team2FoulsLabel.textContent = `Faltas: ${team2Fouls}`;
});
function startTimer() {
   reproducirAudio("audioPlayer");
    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining -= 10;
            updateTimeDisplay();
        } else {
            clearInterval(timer);
            timer = null;
           
          reproducirAudio("HornBasket");  
          console.log('Esperando 3 segundos...');
          setTimeout(() => {
            console.log('¡3 segundos han pasado!');
          }, 3000);
           
          alert("Tiempo finalizado!");
          reproducirAudio("HornBasket");  
        }
    }, 10);
}

function pauseTimer() {
    reproducirAudio("audioPlayer");
    clearInterval(timer);
    timer = null;
}

// Sonidos

function reproducirAudio(audioId) {
    var audioPlayer = document.getElementById(audioId);
    if (audioPlayer) {
        audioPlayer.play();
    } else {
        console.error('No se encontró el elemento de audio con ID:', audioId);
    }
}

function beep() {
/*if you want to beep without using a wave file*/
var context = new AudioContext();
var oscillator = context.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = 500;
oscillator.connect(context.destination);
oscillator.start();
// Beep for 500 milliseconds
setTimeout(function () {
    oscillator.stop();
}, 3000);
}

function beepButton() {

}

function updateTimeDisplay() {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    const milliseconds = timeRemaining % 1000;
    timeDisplay.textContent = `Tiempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  
}