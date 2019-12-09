abstract class _View {
  viewController: ViewController;
  viewName: string;

  constructor(viewController: ViewController, bodyClassName: string) {
    this.viewController = viewController;
    this.viewName = bodyClassName;
  }
}

class _LobbyView extends _View {
  constructor(viewController: ViewController) {
    super(viewController, 'lobby');

    let newSessionButton = document.getElementById('new-session-button');
    if (newSessionButton != null) {
      newSessionButton.addEventListener('click', function() {
        viewController.setView(viewController.newView);
      });
    }
  }
}

class _NewView extends _View {
  constructor(viewController: ViewController) {
    super(viewController, 'new');

    let backButton = document.getElementById('back-button');
    let readyButton = document.getElementById('ready-button');
    if (backButton != null) {
      backButton.addEventListener('click', function() {
        viewController.setView(viewController.lobbyView);
      });
    }
  }
}

class ViewController {
  static _sections = document.getElementsByTagName('section');

  lobbyView: _LobbyView;
  newView: _NewView;
  _views: _View[];
  _currentView: _View;

  constructor() {
    this.lobbyView = new _LobbyView(this);
    this.newView = new _NewView(this);
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

  setView(view: _View): void {
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
