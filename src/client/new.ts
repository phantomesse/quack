function goBackToLobby(): void {
  window.location.href = '/';
}

function createSession(): void {
  let difficulty = document
    .querySelector('input[name="difficulty"]:checked')
    .getAttribute('value');
  let rounds = document
    .querySelector('input[name="rounds"]:checked')
    .getAttribute('value');

  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      window.location.href = '/join/?sessionName=' + request.response;
    }
  };
  request.open('POST', `/new?difficulty=${difficulty}&rounds=${rounds}`, true);
  request.send();
}
