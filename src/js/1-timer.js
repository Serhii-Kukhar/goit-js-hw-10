
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

