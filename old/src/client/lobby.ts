function createNewSession(): void {
  window.location.href = '/new';
}

let joinButtons = document.querySelectorAll('button.join-button');
for (let joinButton of joinButtons) {
  joinButton.addEventListener('click', function() {
    window.location.href = '/play?sessionName=' + joinButton.textContent.trim();
  });
}
