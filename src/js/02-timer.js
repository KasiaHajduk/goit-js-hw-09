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
let nowDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        countDate = selectedDates[0];
        nowDate = calendar.now;
             
        if (countDate < nowDate) {
            window.alert("Please choose a date in the future");
            btnStart.disabled = true;
        }
        else {
            btnStart.disabled = false;
        } 
    },
};

let calendar = flatpickr("#datetime-picker", options);
console.log('nowww' + calendar.now);


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


btnStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        let count = convertMs(countDate.getTime() - new Date);
        countDays.textContent = addLeadingZero(count.days);
        countHours.textContent = addLeadingZero(count.hours);
        countMinutes.textContent = addLeadingZero(count.minutes);
        countSeconds.textContent = addLeadingZero(count.seconds);
    }, 1000);
});

