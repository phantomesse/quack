// requires: views/view.js

class JoinView extends View {
  constructor(viewController: ViewController) {
    super(viewController, 'join');
    this.showSessionId();

    let joinButton = document.getElementById('join-button');
    joinButton.addEventListener('click', function() {
      viewController.setView(viewController.cardView);
      viewController.socket.emit('start session');
    });
  }
}
