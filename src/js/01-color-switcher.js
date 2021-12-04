function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body");
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
btnStart.disabled = false;
btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
});
