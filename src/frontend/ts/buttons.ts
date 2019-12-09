// Changes the button UI when the user clicks or taps on it.
function decorateButtons() {
  let quackSound = new Audio('quack.mp3');
  let quackAltSound = new Audio('quack-alt.mp3');

  const isTouchDevice = 'ontouchstart' in document.documentElement;
  const htmlElement = document.getElementsByTagName('html').item(0);
  const buttons = document.getElementsByTagName('button');
  for (const button of buttons) {
    button.addEventListener(
      isTouchDevice ? 'touchstart' : 'mousedown',
      function() {
        if (htmlElement != null && button.classList.contains('buzzer')) {
          htmlElement.classList.add('buzzer-active');
          let sound =
            Math.floor(Math.random() * 10) < 1 ? quackAltSound : quackSound;
          sound.play();
          sound.currentTime = 0;
        }
        button.classList.add('active');
      }
    );
    button.addEventListener(isTouchDevice ? 'touchend' : 'mouseup', function() {
      if (htmlElement != null && button.classList.contains('buzzer')) {
        htmlElement.classList.remove('buzzer-active');
      }
      button.classList.remove('active');
    });
  }
}
