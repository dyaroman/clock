class Clock {
  constructor(cssSelector) {
    this.renderClock(cssSelector);
    this.showTime();
    setInterval(() => {
      this.showTime();
    }, 1000);
  }

  renderDigit() {
    return `
    <div class="clock__digit digit">
      <div class="digit__item digit__item--0"></div>
      <div class="digit__item digit__item--1"></div>
      <div class="digit__item digit__item--2"></div>
      <div class="digit__item digit__item--3"></div>
      <div class="digit__item digit__item--4"></div>
      <div class="digit__item digit__item--5"></div>
      <div class="digit__item digit__item--6"></div>
    </div>
    `;
  }

  renderDivider() {
    return `
    <div class="clock__divider divider">
      <div class="divider__item"></div>
      <div class="divider__item"></div>
    </div>
    `;
  }

  renderClock(cssSelector) {
    const clockHolder = document.querySelector(cssSelector);
    const clock = document.createElement('div');
    clock.classList.add('js_clock', 'clock');

    this.getArrayFromTime().forEach((i, index) => {
      clock.innerHTML += this.renderDigit();
      if (index % 2 === 1 && index !== this.getArrayFromTime().length - 1) {
        clock.innerHTML += this.renderDivider();
      }
    });

    clockHolder.appendChild(clock);
  }

  convertDigitInArray(num) {
    const arr = [];
    switch (num) {
      case 0:
        arr.push(0, 1, 2, 3, 4, 5);
        break;
      case 1:
        arr.push(1, 2);
        break;
      case 2:
        arr.push(0, 1, 3, 4, 6);
        break;
      case 3:
        arr.push(0, 1, 2, 3, 6);
        break;
      case 4:
        arr.push(1, 2, 5, 6);
        break;
      case 5:
        arr.push(0, 2, 3, 5, 6);
        break;
      case 6:
        arr.push(0, 2, 3, 4, 5, 6);
        break;
      case 7:
        arr.push(0, 1, 2);
        break;
      case 8:
        arr.push(0, 1, 2, 3, 4, 5, 6);
        break;
      case 9:
        arr.push(0, 1, 2, 3, 5, 6);
        break;
    }
    return arr;
  }

  getArrayFromTime() {
    const time = new Date();
    let str = '';
    str += (time.getHours() < 10 ? `0${time.getHours()}` : time.getHours());
    str += (time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes());
    str += (time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds());
    return str.split('').map(i => parseInt(i));
  }

  displayDigit(el, arr) {
    const $digit = document.querySelectorAll('.digit');
    const $digitItems = $digit[el].querySelectorAll('.digit__item');
    const animateClass = 'digit__item--action';

    for (let i = 0; i < $digitItems.length; i++) {
      $digitItems[i].classList.remove(animateClass);
      arr.forEach(item => {
        if ($digitItems[i].classList.contains(`digit__item--${item}`)) {
          $digitItems[i].classList.add(animateClass);
        }
      });
    }
  }

  showTime() {
    this.getArrayFromTime().forEach((i, index) => {
      this.displayDigit(index, this.convertDigitInArray(i));
    });
  }
}

const clock = new Clock('.clock_holder');
