let buzzers = document.querySelectorAll('button.buzzer');
const htmlElement = document.getElementsByTagName('html').item(0);

let quackSound = new Audio('quack.mp3');
let quackAltSound = new Audio('quack-alt.mp3');
let isTouchDevice = 'ontouchstart' in document.documentElement;

for (let buzzer of buzzers) {
  buzzer.addEventListener(isTouchDevice ? 'touchstart' : 'mousedown', function(
    e
  ) {
    htmlElement.classList.add('buzzer-active');
    let sound = Math.floor(Math.random() * 10) < 1 ? quackAltSound : quackSound;
    sound.play();
    sound.currentTime = 0;
  });
  buzzer.addEventListener(isTouchDevice ? 'touchend' : 'mouseup', function(e) {
    htmlElement.classList.remove('buzzer-active');
  });
}
