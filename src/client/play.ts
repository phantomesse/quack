let buzzers = document.querySelectorAll('button.buzzer');
const htmlElement = document.getElementsByTagName('html').item(0);

let quackSound = new Audio('quack.mp3');
let quackAltSound = new Audio('quack-alt.mp3');

for (let buzzer of buzzers) {
  buzzer.addEventListener(
    isTouchDevice ? 'touchstart' : 'mousedown',
    function() {
      htmlElement.classList.add('buzzer-active');
      let sound =
        Math.floor(Math.random() * 10) < 1 ? quackAltSound : quackSound;
      sound.play();
      sound.currentTime = 0;
    }
  );
  buzzer.addEventListener(isTouchDevice ? 'touchend' : 'mouseup', function() {
    htmlElement.classList.remove('buzzer-active');
  });
}

let socket = io();

socket.on('too many connected', function() {
  window.location.href = '/';
});

socket.on('show waiting screen', function() {
  _showSection('waiting');
});

socket.on('show join screen', function() {
  _showSection('join');
});

function _showSection(sectionId: string) {
  let sections = document.getElementsByTagName('section');
  for (let section of sections) {
    if (section.id === sectionId) {
      if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
      }
    } else {
      if (!section.classList.contains('hidden')) {
        section.classList.add('hidden');
      }
    }
  }
}
