const _hour = document.getElementById("hour");
const _minute = document.getElementById("minute");
const _second = document.getElementById("second");

const alarm = new Audio('assets/music/alarmsound.wav');

let totalTimeInSeconds = 0; // Total time in seconds
let intervalId = null;
let startTime = null; // Timestamp when countdown started

document.addEventListener("click", handleClick);

function handleClick(event) {
    const clickedButtonId = event.target.id;

    if (clickedButtonId === "plus1") totalTimeInSeconds += 60;
    if (clickedButtonId === "plus5") totalTimeInSeconds += 5 * 60;
    if (clickedButtonId === "plus30") totalTimeInSeconds += 30 * 60;
    if (clickedButtonId === "minus1") totalTimeInSeconds -= 60;
    if (clickedButtonId === "minus5") totalTimeInSeconds -= 5 * 60;
    if (clickedButtonId === "minus30") totalTimeInSeconds -= 30 * 60;

    // Prevent negative time
    if (totalTimeInSeconds < 0) totalTimeInSeconds = 0;

    updateDisplay();

    if (clickedButtonId === "startBtn") {
        if (!intervalId) {
            startTime = Date.now(); // Record the start time
            intervalId = setInterval(countdown, 1000);
        }
    }

    if (clickedButtonId === "pouseBtn") {
        clearInterval(intervalId);
        intervalId = null;
    }

    if (clickedButtonId === "resetBtn") {
        totalTimeInSeconds = 0;
        clearInterval(intervalId);
        intervalId = null;
        alarm.pause();
        alarm.currentTime = 0;
        updateDisplay();
    }
}

function countdown() {
    const now = Date.now();
    const elapsedTime = Math.floor((now - startTime) / 1000); // Elapsed time in seconds
    const remainingTime = totalTimeInSeconds - elapsedTime;

    if (remainingTime <= 0) {
        clearInterval(intervalId);
        alarm.play();
        totalTimeInSeconds = 0;
        updateDisplay();
        intervalId = null;
        return;
    }

    updateDisplay(remainingTime);
}

function updateDisplay(remainingTime = totalTimeInSeconds) {
    const h = Math.floor(remainingTime / 3600);
    const min = Math.floor((remainingTime % 3600) / 60);
    const sec = remainingTime % 60;

    _hour.textContent = formatValue(h);
    _minute.textContent = formatValue(min);
    _second.textContent = formatValue(sec);
}

const formatValue = (time) => {
    return time.toString().padStart(2, "0");
};
