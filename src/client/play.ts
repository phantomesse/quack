let buzzers = document.querySelectorAll('button.buzzer');
const htmlElement = document.getElementsByTagName('html').item(0);
const bodyElement = document.getElementsByTagName('body').item(0);

for (let buzzer of buzzers) {
  buzzer.addEventListener('mousedown', function(e) {
    htmlElement.classList.add('buzzer-active');
    bodyElement.classList.add('buzzer-active');
  });
  buzzer.addEventListener('mouseup', function(e) {
    htmlElement.classList.remove('buzzer-active');
    bodyElement.classList.remove('buzzer-active');
  });
}
