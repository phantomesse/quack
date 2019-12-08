let isTouchDevice = 'ontouchstart' in document.documentElement;

let buttons = document.querySelectorAll('button:not(.buzzer)');
for (let button of buttons) {
  button.addEventListener(
    isTouchDevice ? 'touchstart' : 'mousedown',
    function() {
      button.classList.add('active');
    }
  );
  button.addEventListener(isTouchDevice ? 'touchend' : 'mouseup', function() {
    button.classList.remove('active');
  });
}
