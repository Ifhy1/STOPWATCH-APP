// Get elements
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeToggle = document.getElementById("themeBtn"); // fixed ID
const lapsWrapper = document.getElementById("lapsWrapper");
const lapsList = document.getElementById("lapsList");

// Time variables
let hours = 0;
let minutes = 0;
let seconds = 0;

// Timer interval + state
let timerInterval = null;
let isRunning = false;

// Format & update display
function updateDisplay() {
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  display.textContent = `${h}:${m}:${s}`;
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      updateDisplay();
    }, 1000);
  }
}

// Stop timer
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// Reset timer
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();

  // Clear laps and hide wrapper
  lapsList.innerHTML = "";
  lapsWrapper.style.display = "none";
}

// Add Lap
lapBtn.addEventListener("click", () => {
  const lapTime = display.textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);

  // Show laps wrapper if hidden
  lapsWrapper.style.display = "block";
});

// Theme toggle (light/dark)
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌑"; // dark mode icon
  } else {
    themeToggle.textContent = "☀️"; // light mode icon
  }
});

// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial display
updateDisplay();

// Hide laps at start
lapsWrapper.style.display = "none";
