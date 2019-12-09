abstract class View {
  viewController: ViewController;
  viewName: string;

  constructor(viewController: ViewController, bodyClassName: string) {
    this.viewController = viewController;
    this.viewName = bodyClassName;
  }

  showSessionId(): void {
    this.viewController.socket.emit('get session id');
    let viewController = this.viewController;
    this.viewController.socket.on('update session id', function(sessionId) {
      if (sessionId === 'N/A') {
        viewController.setView(viewController.lobbyView);
        return;
      }
      let sessionIdElements = document.querySelectorAll('.session-id');
      for (let element of sessionIdElements) {
        element.innerHTML = 'session: ' + sessionId;
      }
    });
  }
}
