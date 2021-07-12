
import "../sass/main.scss";

import Swal from 'sweetalert2'

const refs = {
    choosedDate: document.querySelector('#date-selector'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    startBtn: document.querySelector('[data-start]')
}

refs.choosedDate.addEventListener('change', dateChoosing)
// refs.startBtn.style.display = 'none';


function dateChoosing() {
    const input = this.value;
    const dateEntered = new Date(input);
    const currentDate = Date.now();
    let time = dateEntered - currentDate;
    if (time < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please choose a date in the future',
        })
        return
         
    }
    
//  refs.startBtn.style.display = 'block';
   

    let convertTime = convertMs(time);

    refs.days.textContent = convertTime.days;
    refs.hours.textContent = convertTime.hours;
    refs.minutes.textContent = convertTime.minutes;
    refs.seconds.textContent = convertTime.seconds;

    refs.startBtn.addEventListener('click', startCounter)

    function startCounter() {
        const intervalId = setInterval(() => {
            time -= 1000;
           convertTime = convertMs(time);
            refs.days.textContent = convertTime.days;
            refs.hours.textContent = convertTime.hours;
            refs.minutes.textContent = convertTime.minutes;
            refs.seconds.textContent = convertTime.seconds;
            if (time < 1000) {
                clearInterval(intervalId);
            }
        }, 1000);

        refs.startBtn.removeEventListener('click', startCounter)
        
    }
    refs.choosedDate.style.display = 'none';
    
}



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


