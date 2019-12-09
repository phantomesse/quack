// requires: views/view.js views/lobby-view.js views/new-view.js

class ViewController {
  static _sections = document.getElementsByTagName('section');

  socket;
  lobbyView: LobbyView;
  newView: NewView;
  _views: View[];
  _currentView: View;

  constructor(socket) {
    this.socket = socket;
    this.lobbyView = new LobbyView(this);
    this.newView = new NewView(this);
    this._views = [this.lobbyView, this.newView];

    this._setView();
    window.onpopstate = () => this._setView();
  }

  static get _params(): Map<String, String> {
    let params = window.location.search
      .substr(1)
      .split('&')
      .map(pair => pair.split('='));
    let paramsMap = new Map<string, string>();
    for (let param of params) {
      paramsMap.set(param[0], param[1]);
    }
    return paramsMap;
  }

  _setView(): void {
    let params = ViewController._params;
    let viewName = params.get('view');
    if (!params.has('view')) {
      this.setView(this.lobbyView);
      return;
    }

    for (let view of this._views) {
      if (view.viewName === viewName) {
        this.setView(view);
        return;
      }
    }
  }

  setView(view: View): void {
    this._currentView = view;

    // Update url.
    history.pushState(null, '', '?view=' + view.viewName);

    // Toggle section visibility.
    for (let section of ViewController._sections) {
      if (
        section.id === view.viewName &&
        section.classList.contains('hidden')
      ) {
        section.classList.remove('hidden');
      } else if (
        section.id !== view.viewName &&
        !section.classList.contains('hidden')
      ) {
        section.classList.add('hidden');
      }
    }
  }
}
