let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)));

    return (
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + "." +
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
    }, 10);

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function pause() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 0;
    display.textContent = "00:00:00.00";
    laps.innerHTML = "";

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function lap() {
    lapCounter++;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>Lap ${lapCounter} - ${formatTime(elapsedTime)}</span>
        <button class="remove-btn">X</button>
    `;

    // Remove individual lap
    li.querySelector(".remove-btn").addEventListener("click", () => {
        li.remove();
    });

    laps.appendChild(li);
}