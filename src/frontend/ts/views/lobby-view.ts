// requires: views/view.js

class LobbyView extends View {
  constructor(viewController: ViewController) {
    super(viewController, 'lobby');

    let newSessionButton = document.getElementById('new-session-button');
    newSessionButton.addEventListener('click', function() {
      viewController.setView(viewController.newView);
    });

    let self = this;
    viewController.socket.emit('get existing sessions');
    viewController.socket.on('update existing sessions', function(sessionIds) {
      self._listExistingSessions(viewController, sessionIds);
    });
  }

  _listExistingSessions(
    viewController: ViewController,
    sessionIds: string[]
  ): void {
    let existingSessionsContainer = document.getElementById(
      'existing-sessions'
    );
    while (existingSessionsContainer.firstChild) {
      existingSessionsContainer.removeChild(
        existingSessionsContainer.firstChild
      );
    }
    existingSessionsContainer.previousElementSibling.classList.toggle(
      'hidden',
      sessionIds.length === 0
    );
    for (let sessionId of sessionIds) {
      let button = document.createElement('button');
      button.innerText = sessionId;
      button.addEventListener('click', function() {
        viewController.setView(viewController.joinView);
      });
      existingSessionsContainer.appendChild(button);
    }
  }
}
