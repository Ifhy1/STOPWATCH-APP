// Elements
const display = document.getElementById("display");
const msSpan = display.querySelector(".ms");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeToggle = document.getElementById("themeBtn");
const lapsWrapper = document.getElementById("lapsWrapper");
const lapsList = document.getElementById("lapsList");

// Time variables
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let timerInterval = null;
let isRunning = false;

// Update display
function updateDisplay() {
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  const ms = Math.floor(milliseconds / 10).toString().padStart(2, "0");
  display.firstChild.textContent = `${h}:${m}:${s}`;
  msSpan.textContent = `.${ms}`;
}

// Start
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      milliseconds += 10;
      if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
      }
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 10);
  }
}

// Stop
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Reset
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  hours = minutes = seconds = milliseconds = 0;
  updateDisplay();
  lapsList.innerHTML = "";
  lapsWrapper.style.display = "none";
}

// Lap
lapBtn.addEventListener("click", () => {
  const lapTime = `${display.firstChild.textContent}${msSpan.textContent}`;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapsWrapper.style.display = "block";
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "🌑" : "☀️";
});

// Events
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Init
updateDisplay();
lapsWrapper.style.display = "none";
