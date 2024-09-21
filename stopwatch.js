
const playButton = document.querySelector('.play');
const lapButton = document.querySelector('.lap');
const resetButton = document.querySelector('.reset');
const clearLapsButton = document.querySelector('.clear-laps');
const minuteDisplay = document.querySelector('.minute');
const secondDisplay = document.querySelector('.second');
const millisecondDisplay = document.querySelector('.millisecond');
const lapsList = document.querySelector('.laps-list');
const outerCircle = document.querySelector('.outer-circle');


let isRunning = false;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapCount = 0;
let interval;


function toggleButtons() {
  lapButton.classList.remove('hidden');
  resetButton.classList.remove('hidden');
}


function playStopwatch() {
  if (!isRunning) {
    playButton.textContent = 'Pause';
    startTimer();
    isRunning = true;
    outerCircle.classList.add('pulse');
  } else {
    playButton.textContent = 'Play';
    clearInterval(interval);
    isRunning = false;
    outerCircle.classList.remove('pulse');
  }
  toggleButtons();
}
function startTimer() {
  interval = setInterval(() => {
    milliseconds += 10;
    if (milliseconds >= 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    updateDisplay();
  }, 10);
}


function updateDisplay() {
  minuteDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:`;
  secondDisplay.textContent = `${seconds < 10 ? '0' : ''}${seconds}:`;
  millisecondDisplay.textContent = `${milliseconds < 100 ? '0' : ''}${Math.floor(milliseconds / 10)}`;
}


function resetStopwatch() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  updateDisplay();
  lapButton.classList.add('hidden');
  resetButton.classList.add('hidden');
  isRunning = false;
  playButton.textContent = 'Play';
  lapsList.innerHTML = '';
  clearLapsButton.classList.add('hidden');
  outerCircle.classList.remove('pulse');
}

function recordLap() {
  lapCount++;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 100 ? '0' : ''}${Math.floor(milliseconds / 10)}`;
  lapsList.appendChild(lapItem);
  lapsList.classList.remove('hidden');
  clearLapsButton.classList.remove('hidden');
}


function clearAllLaps() {
  lapsList.innerHTML = '';
  lapCount = 0;
  clearLapsButton.classList.add('hidden');
}


playButton.addEventListener('click', playStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
clearLapsButton.addEventListener('click', clearAllLaps);
