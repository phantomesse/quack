// requires: views/view.js

class NewView extends View {
  constructor(viewController: ViewController) {
    super(viewController, 'new');

    let backButton = document.getElementById('back-button');
    backButton.addEventListener('click', function() {
      viewController.setView(viewController.lobbyView);
    });

    let readyButton = document.getElementById('ready-button');
    readyButton.addEventListener('click', function() {
      let difficulty = document
        .querySelector('input[name="difficulty"]:checked')
        .getAttribute('value');
      let rounds = parseInt(
        document
          .querySelector('input[name="rounds"]:checked')
          .getAttribute('value'),
        10
      );

      viewController.socket.emit('add new session', {
        difficulty: difficulty,
        rounds: rounds
      });
    });
  }
}
