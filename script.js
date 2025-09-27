const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const themeToggle = document.getElementById("themeBtn"); 
const lapsWrapper = document.getElementById("lapsWrapper");
const lapsList = document.getElementById("lapsList");

let hours = 0;
let minutes = 0;
let seconds = 0;

let timerInterval = null;
let isRunning = false;

function updateDisplay() {
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  display.textContent = `${h}:${m}:${s}`;
}

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

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  updateDisplay();

  lapsList.innerHTML = "";
  lapsWrapper.style.display = "none";
}

lapBtn.addEventListener("click", () => {
  const lapTime = display.textContent;
  const lapItem = document.createElement("li");
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);

  lapsWrapper.style.display = "block";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeToggle.textContent = "🌑";
  } else {
    themeToggle.textContent = "☀️"; 
  }
});

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

lapsWrapper.style.display = "none";
