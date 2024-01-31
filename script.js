

const $bigBall = document.querySelector('.cursor__ball--big');
const $smallBall = document.querySelector('.cursor__ball--small');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .35, {
    x: e.pageX - 15,
    y: e.pageY - 12 });

  TweenMax.to($smallBall, .1, {
    x: e.pageX - 5,
    y: e.pageY - 7 });

}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, 0.1, {
    scale: 8 });

}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .2, {
    scale: 1 });

}

//for date and time
const dateElement = document.getElementById("date");

// Función para actualizar la hora
function updateClock() {
  // Obtén la fecha y hora actual
  const now = new Date();

  // Formatea la hora, minutos y segundos
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // Construye la cadena de la hora
  const timeString = `${hours}:${minutes}:${seconds}`;

  // Actualiza el contenido del elemento h2
  dateElement.textContent = timeString;
}

// Actualiza la hora cada segundo
setInterval(updateClock, 1000);

// Llama a la función para mostrar la hora inicialmente
updateClock();