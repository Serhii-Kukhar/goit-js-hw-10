
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import 'flatpickr/dist/themes/material_blue.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



    const datePicker = document.querySelector('#datetime-picker');
    const startButton = document.querySelector('[data-start]');
    const timerDays = document.querySelector('[data-days]');
    const timerHours = document.querySelector('[data-hours]');
    const timerMinutes = document.querySelector('[data-minutes]');
    const timerSeconds = document.querySelector('[data-seconds]');


    let userSelectedDate = null;
    let countdownInterval = null;


    flatpickr(datePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            if (selectedDate <= new Date()) {
                iziToast.error({
                    title: "Помилка",
                    message: "Please choose a date in the future",
                    position: "topRight",
                });
                startButton.disabled = true;
            } else {
                userSelectedDate = selectedDate;
                startButton.disabled = false;
            }
        },
    });
    
    function addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }
    

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
    
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
        return { days, hours, minutes, seconds };
    }

    function updateTimerUI({ days, hours, minutes, seconds }) {
        timerDays.textContent = addLeadingZero(days);
        timerHours.textContent = addLeadingZero(hours);
        timerMinutes.textContent = addLeadingZero(minutes);
        timerSeconds.textContent = addLeadingZero(seconds);
    };
        function startCountdown() {
            startButton.disabled = true;
            datePicker.disabled = true;
        
            countdownInterval = setInterval(() => {
                const timeRemaining = userSelectedDate - new Date();
        
                if (timeRemaining <= 0) {
                    clearInterval(countdownInterval);
                    updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                    datePicker.disabled = false;
                    iziToast.success({
                        title: "Готово!",
                        message: "Час вийшов!",
                        position: "topRight",
                    });
                    return;
                }
        
                updateTimerUI(convertMs(timeRemaining));
            }, 1000);
        }
        
        startButton.addEventListener("click", startCountdown);
















// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/material_blue.css';

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const refs = {
//   inputDataTimer: document.querySelector('#datetime-picker'),
//   startBtn: document.querySelector('[data-start]'),

//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
// };

// refs.startBtn.addEventListener('click', () => {
//   timer.start();
// });

// let userSelectedDate = null;
// refs.startBtn.disabled = true;

// const myTimer = flatpickr('#datetime-picker', {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     userSelectedDate = selectedDates[0];

//     if (userSelectedDate < new Date()) {
//       iziToast.warning({
//         color: 'red',
//         position: 'topRight',
//         message: 'Please choose a date in the future',
//       });

//       refs.startBtn.disabled = true;
//     } else {
//       refs.startBtn.disabled = false;
//     }
//   },
// });

// const timer = {
//   intervalId: null,

//   start() {
//     refs.inputDataTimer.disabled = true;
//     refs.startBtn.disabled = true;

//     this.intervalId = setInterval(() => {
//       const ms = userSelectedDate - Date.now();

//       if (ms < 0) {
//         clearInterval(this.intervalId);
//         refs.inputDataTimer.disabled = false;
//         return;
//       }

//       updateTimer(convertMs(ms));
//     }, 1000);
//   },
// };

// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function updateTimer({ days, hours, minutes, seconds }) {
//   refs.days.textContent = addLeadingZero(days);
//   refs.hours.textContent = addLeadingZero(hours);
//   refs.minutes.textContent = addLeadingZero(minutes);
//   refs.seconds.textContent = addLeadingZero(seconds);
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }
