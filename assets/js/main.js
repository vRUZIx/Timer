const _hour = document.getElementById("hour");
const _minute = document.getElementById("minute");
const _second = document.getElementById("second");

const alarm = new Audio('C:\\Users\\ASUS\\OneDrive\\Desktop\\timer\\assets\\music\\alarmsound.wav');

let min = 0, h = 0, sec = 0;
let intervalId = null;

document.addEventListener("click", myfunction);
function myfunction(event) {
    const clcbtn = event.target.id; 
    if (clcbtn === "plus1") min += 1;
    if (clcbtn === "plus5") min += 5;
    if (clcbtn === "plus30") min += 30;
    if (clcbtn === "minus1") min -= 1;
    if (clcbtn === "minus5") min -= 5;
    if (clcbtn === "minus30") min -= 30;
    if (min >= 60) {
        h += Math.floor(min / 60);
        min %= 60;
    }
    if (min < 0) {
        if (h > 0) {
            h--;    
            min+=60;
        } else {
            min=0;
            sec=0;
        }
    }
    updateDisplay();
    if (clcbtn === "startBtn") {
        if (!intervalId) { 
            intervalId = setInterval(countdown, 1000);
        }
    }
    if (clcbtn === "pouseBtn") {
        clearInterval(intervalId);
        intervalId = null; 
    }
    if(clcbtn==="resetBtn"){    
          h = 0;
        min = 0;
        sec = 0;
        clearInterval(intervalId); 
        intervalId = null; 
        alarm.play();
        updateDisplay();
    }
}
function countdown() {
    if (h === 0 && min === 0 && sec === 0) {
        console.log("Done");
        clearInterval(intervalId);
        alarm.play();
        intervalId = null;
        return;
    }
    sec--;
    if (sec < 0) {
        if (min > 0) {
            min--;
            sec = 59;
        } else if (h > 0) {
            h--;
            min = 59;
            sec = 59;
        } else {
            sec = 0;
        }
    }
    updateDisplay();
}
function updateDisplay() {
    _hour.textContent = formatvalue(h);
    _minute.textContent = formatvalue(min);
    _second.textContent = formatvalue(sec);
}
const formatvalue = (time)=>{
    return time.toString().padStart(2,"0");
}