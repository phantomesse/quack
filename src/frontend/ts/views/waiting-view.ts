// requires: views/view.js

class WaitingView extends View {
  constructor(viewController: ViewController) {
    super(viewController, 'waiting');
    this.showSessionId();

    viewController.socket.on('start session from waiting', function() {
      if (viewController.currentView === viewController.waitingView) {
        viewController.setView(viewController.buzzView);
      }
    });
  }
}
