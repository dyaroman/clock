(() => {
  // const $clock = document.querySelector('.js_clock');

  const convertDigitInArray = num => {
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
  };

  const displayDigit = (el, arr) => {
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
  };

  const getArrayFromTime = () => {
    const time = new Date();
    let str = '';
    str += (time.getHours() < 10 ? `0${time.getHours()}` : time.getHours());
    str += (time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes());
    str += (time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds());
    return str.split('').map(i => parseInt(i));
  };

  const showTime = () => {
    getArrayFromTime().forEach((i, index) => {
      displayDigit(index, convertDigitInArray(i));
    });
  };

  showTime();
  setInterval(showTime, 1000);
})();
