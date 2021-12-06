import Notiflix from 'notiflix';

import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';


const btnStart = document.querySelector("[data-start]");
const countDays = document.querySelector("[data-days]");
const countHours = document.querySelector("[data-hours]");
const countMinutes = document.querySelector("[data-minutes]");
const countSeconds = document.querySelector("[data-seconds]");

btnStart.disabled = true;
let timerId = null;

let countDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        countDays.textContent = countHours.textContent = countMinutes.textContent = countSeconds.textContent = "00";
        clearInterval(timerId);
        countDate = selectedDates[0];
        if (countDate < calendar.now) {
            Notiflix.Notify.failure('Please choose a date in the future');
            btnStart.disabled = true;
            return;
        }
        btnStart.disabled = false;
    },
};

let calendar = flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return (value.toString().padStart(2, '0'));
}


function timeTimer(){
    btnStart.disabled = true;
    timerId = setInterval(() => {
        const actualTime = new Date();
        const time = (countDate.getTime() - actualTime.getTime());
        console.log(time);
        if (time <= 0) {
            clearInterval(timerId);
            btnStart.disabled = false;
            return;
        }
        const count = convertMs(time);
        countDays.textContent = addLeadingZero(count.days);
        countHours.textContent = addLeadingZero(count.hours);
        countMinutes.textContent = addLeadingZero(count.minutes);
        countSeconds.textContent = addLeadingZero(count.seconds);
    }, 1000);
    

};

btnStart.addEventListener("click", timeTimer);


//INTERFEJS
const input = document.querySelector('input');
input.style.fontSize = '35px';
input.style.marginLeft = '30px';

btnStart.style.fontSize = '30px';
btnStart.style.padding = '4px';

const timer = document.querySelector('.timer');
timer.style.marginTop = '30px';
timer.style.display = 'flex';
timer.style.flexDirection = 'flex';

const timerClocks = document.querySelectorAll('.field');
for (const timerClock of timerClocks) {
  timerClock.style.display = 'flex';
  timerClock.style.flexDirection = 'column';
  timerClock.style.alignItems = 'center';
  timerClock.style.marginLeft = '30px';
  timerClock.style.textTransform = 'uppercase';
  timerClock.style.fontSize = '25px';
};

const timerValues = document.querySelectorAll('.value');
for (const timerValue of timerValues) {
    timerValue.style.fontSize = '60px';
};
