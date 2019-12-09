// requires: views/view.js

class LobbyView extends View {
  constructor(viewController: ViewController) {
    super(viewController, 'lobby');

    let newSessionButton = document.getElementById('new-session-button');
    newSessionButton.addEventListener('click', function() {
      viewController.setView(viewController.newView);
    });
  }
}
