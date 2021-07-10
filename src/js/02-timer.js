import '../css/common.css';
import "../sass/main.scss";



class CountdownTimer {

  constructor({selector, targetDate}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector('[data-value="days"]'),
      hours: document.querySelector('[data-value="hours"]'),
      mins: document.querySelector('[data-value="mins"]'),
      secs: document.querySelector('[data-value="secs"]'),
    }
  

    setInterval(() => {
        const startDate = Date.now();
        const time = this.targetDate - startDate;
        const { days, hours, mins, secs } = this.getTimeComponents(time);

        this.updateClockface(this.getTimeComponents(time));

      }, 1000);
   }

// - Принимает время в миллисекундах
// - Вычисляет сколько в них вмещается дней, часов, минут, секунд
// - Возвращает обьект со свойствами days, hours, mins, secs
   getTimeComponents(time) {
  
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
   
    const mins =  this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      
    const secs =  this.pad(Math.floor((time % (1000 * 60)) / 1000));
  
      return { days, hours, mins, secs };
  }

// Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2 знаков
// 7=>07, 1=>01, 12=>12
pad(value) {
  return String(value).padStart(2, "0");
}

updateClockface({days, hours, mins, secs}) {
  
  this.refs.days.textContent = `${days}`;
  this.refs.hours.textContent = `${hours}`;
  this.refs.mins.textContent = `${mins}`;
  this.refs.secs.textContent = `${secs}`;
}
};

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date("Jul 17, 2021")
});