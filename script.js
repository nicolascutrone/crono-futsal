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
    const btnestablecer = document.getElementById('setTimeButton');
   btnestablecer.disabled = true; 
  
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
  const btnestablecer = document.getElementById('setTimeButton');
   btnestablecer.disabled = false; 
});

startPauseButton.addEventListener('click', () => {
     if (timeRemaining > 0) {
        if (!timer) {

            startTimer();
        } else {
            pauseTimer();
        }
     }
});

Bocina.addEventListener('click', () => {
   // beep();
  reproducirAudio("HornBasket", true);
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
    reproducirAudio("audioGOL");
    addGoal('team1');
});
document.querySelector('#team1 .goalButtonRest').addEventListener('click', () => {
  
  if (team1Goalsadd>0) {
    team1Goalsadd--;
  }
    team1GoalsLabel.textContent = `GOLES: ${team1Goalsadd}`;
    reproducirAudio("audioGOL");
});

document.querySelector('#team2 .goalButtonRest2').addEventListener('click', () => {
  
  if (team2Goals>0) { team2Goals--};
    team2GoalsLabel.textContent = `GOLES: ${team2Goals}`;
    reproducirAudio("audioGOL");   
});

document.querySelector('#team1 .foulButton').addEventListener('click', () => {
    team1Fouls++;
    
    team1FoulsLabel.textContent = `Faltas: ${team1Fouls}`;
    reproducirAudio("audioFaul");
});

document.querySelector('#team1 .foulButtonMinos').addEventListener('click', () => {
    
  if (team1Fouls>0) team1Fouls--;
    team1FoulsLabel.textContent = `Faltas: ${team1Fouls}`;
    reproducirAudio("audioFaul"); 
});

document.querySelector('#team2 .goalButton').addEventListener('click', () => {
    team2Goals++;
    team2GoalsLabel.textContent = `GOLES: ${team2Goals}`;
    reproducirAudio("audioGOL");
   addGoal('team2');
});


document.querySelector('#team2 .foulButton').addEventListener('click', () => {
    
    team2Fouls++;
    team2FoulsLabel.textContent = `Faltas: ${team2Fouls}`;
    reproducirAudio("audioFaul");   
});

document.querySelector('#team2 .foulButtonMenos').addEventListener('click', () => {
  
  if (team2Fouls>0) team2Fouls--;
    team2FoulsLabel.textContent = `Faltas: ${team2Fouls}`;
    reproducirAudio("audioFaul");     
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
           
          reproducirAudio("HornBasket",true);  
          console.log('Esperando 3 segundos...');
          setTimeout(() => {
            console.log('¡3 segundos han pasado!');
          }, 3000);
           
          alert("Tiempo finalizado!");
          reproducirAudio("HornBasket",true);  
        }
    }, 10);
}

function pauseTimer() {
    reproducirAudio("audioPlayer");
    clearInterval(timer);
    timer = null;
}

// Sonidos

function reproducirAudio(audioId, forcePlay = false) {
    var soundToggle = localStorage.getItem('soundToggle') === 'true';
    var audioPlayer = document.getElementById(audioId);
   if (soundToggle || forcePlay) {
      if (audioPlayer) {
          audioPlayer.play();
      } else {
          console.error('No se encontró el elemento de audio con ID:', audioId);
      }
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

//   Reloj Tiempo Muerto

 let tiempoRestante = 60; // 1 minuto en segundos
        let intervalo;

 function mostrarPopup() {
             if (timeRemaining > 0)  {
                  pauseTimer() ;
                   reproducirAudio("HornBasket",true);
                  document.getElementById('popup').style.display = 'block';
                  tiempoRestante = 60; // Reiniciar tiempo
                  document.getElementById('time').innerText = '01:00'; // Reiniciar display
                  document.getElementById('circle').style.background = 'conic-gradient(#FFA500 0% 0%, #fff 0% 100%)'; // Reiniciar relleno
                  clearInterval(intervalo);
                  intervalo = setInterval(actualizarReloj, 1000);
                  document.getElementById('mostrarPopupBtn').disabled = true; 
               // Deshabilitar botón
             }
        }

        function cerrarPopup() {
            document.getElementById('popup').style.display = 'none';
            clearInterval(intervalo);
            document.getElementById('mostrarPopupBtn').disabled = false; // Habilitar botón
           reproducirAudio("HornBasket",true);
        }

        function actualizarReloj() {
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                reproducirAudio("CarDoorChime");
                return;
            }

            tiempoRestante--;
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            document.getElementById('time').innerText = 
                `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

            const porcentaje = ((60 - tiempoRestante) / 60) * 100;
            document.getElementById('circle').style.background = 
                `conic-gradient(#FFA500 ${porcentaje}%, #fff ${porcentaje}% 100%)`;
        }

        

// Fecha y Hora

 function actualizarFechaHora() {
            const now = new Date();
            const fecha = now.toLocaleDateString();
            const hora = now.toLocaleTimeString();
            document.getElementById('datetime').innerText = `${fecha} ${hora}`;
        }

        setInterval(actualizarFechaHora, 1000);
 actualizarFechaHora(); // Actualizar inmediatamente al cargar la página


// popup opcion 3 menu principal

// Mostrar el popup para la opción 3
      document.getElementById('openPopup2').onclick = function() {
      document.getElementById('popup2').style.display = 'block';
      document.getElementById('popup-background').style.display = 'block';
    }

    // Cerrar el popup para la opción 2
    function cerrarPopup2() {
      document.getElementById('popup2').style.display = 'none';
      document.getElementById('popup-background').style.display = 'none';
    }
//*****  Efecto especial

 function addGoal(team) {
    var teamElement = document.getElementById(team);
    var goalElement = teamElement.querySelector('.goals');
    var currentGoals = parseInt(goalElement.textContent.replace('GOLES: ', ''));
    goalElement.textContent = 'GOLES: ' + (currentGoals + 1);

    // Aplicar la animación
    goalElement.classList.add('goal-change');

    // Remover la animación después de que termine
    setTimeout(function() {
      goalElement.classList.remove('goal-change');
    }, 500); // 500 ms es la duración de la animación
  }


 // Aplicar configuraciones guardadas al cargar la página
  window.onload = function() {
    var soundToggle = localStorage.getItem('soundToggle') === 'true';
    // Aplicar el estado del sonido
    document.getElementById('soundToggle').checked = soundToggle;
  }

function guardarConfiguracion() {
    var soundToggle = document.getElementById('soundToggle').checked;
    localStorage.setItem('soundToggle', soundToggle);
    cerrarPopup();
  }
//Modal 
///*****************************
 // Obtener el modal
  var modal = document.getElementById("faltaModal");

  // Obtener el botón que abre el modal
  var faltaButtons = document.querySelectorAll(".foulButton");


 
  // Obtener el elemento <span> que cierra el modal
  var span = document.getElementsByClassName("close")[0];

  // Obtener los botones de las tarjetas
  var amarillaBtn = document.getElementById("amarillaBtn");
  var rojaBtn = document.getElementById("rojaBtn");

  // Contenedores de tarjetas
  var localTarjetas = document.getElementById("localTarjetas");
  var visitanteTarjetas = document.getElementById("visitanteTarjetas");

  // Variable para saber en qué equipo se está añadiendo la falta
  var currentTeam;
  var selectedTarjeta;

  // Modal de confirmación de eliminación
  var confirmModal = document.getElementById("confirmModal");
  var closeConfirm = document.getElementsByClassName("closeConfirm")[0];
  var confirmYes = document.getElementById("confirmYes");
  var confirmNo = document.getElementById("confirmNo");

  // Cuando el usuario hace clic en un botón +Falta, abre el modal y establece el equipo actual
  faltaButtons.forEach(function(button) {
    button.onclick = function() {
      modal.style.display = "block";
      currentTeam = button.getAttribute("data-team");
    };
  });

  // Cuando el usuario hace clic en <span> (x), cierra el modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Función para añadir tarjeta
  function addTarjeta(color) {
      var tarjeta = document.createElement("div");
      tarjeta.className = "tarjeta " + color;
      tarjeta.onclick = function() {
          selectedTarjeta = tarjeta;
          confirmModal.style.display = "block";
      };
      if (currentTeam === "local") {
          localTarjetas.appendChild(tarjeta);
      } else if (currentTeam === "visitante") {
          visitanteTarjetas.appendChild(tarjeta);
      }
  }

  // Cuando el usuario hace clic en una tarjeta, realiza la acción correspondiente y cierra el modal
  amarillaBtn.onclick = function() {
    addTarjeta("amarilla");
    modal.style.display = "none";
  };

  rojaBtn.onclick = function() {
    addTarjeta("roja");
    modal.style.display = "none";
  };

  // Cuando el usuario hace clic fuera del modal, cierra el modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Cuando el usuario hace clic en una tarjeta, realiza la acción correspondiente y cierra el modal
  amarillaBtn.onclick = function() {
      addTarjeta("amarilla");
      modal.style.display = "none";
  };

  rojaBtn.onclick = function() {
      addTarjeta("roja");
      modal.style.display = "none";
  };
 // Cuando el usuario hace clic en "Sí", elimina la tarjeta seleccionada
  confirmYes.onclick = function() {
      if (selectedTarjeta) {
          selectedTarjeta.remove();
          selectedTarjeta = null;
      }
      confirmModal.style.display = "none";
  };

  // Cuando el usuario hace clic en "No", cierra el modal de confirmación
  confirmNo.onclick = function() {
      confirmModal.style.display = "none";
      selectedTarjeta = null;
  };