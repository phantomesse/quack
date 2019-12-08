let buzzers = document.querySelectorAll('button.buzzer');
const htmlElement = document.getElementsByTagName('html').item(0);
const bodyElement = document.getElementsByTagName('body').item(0);

let quackSound = new Audio('quack.mp3');
let quackAltSound = new Audio('quack-alt.mp3');

for (let buzzer of buzzers) {
  buzzer.addEventListener('mousedown', function(e) {
    htmlElement.classList.add('buzzer-active');
    bodyElement.classList.add('buzzer-active');
    let sound = Math.floor(Math.random() * 10) < 1 ? quackAltSound : quackSound;
    sound.play();
    sound.currentTime = 0;
  });
  buzzer.addEventListener('mouseup', function(e) {
    htmlElement.classList.remove('buzzer-active');
    bodyElement.classList.remove('buzzer-active');
  });
}
