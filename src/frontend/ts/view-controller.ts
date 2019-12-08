abstract class _View {
  bodyClassName: string;

  constructor(bodyClassName: string) {
    this.bodyClassName = bodyClassName;
  }
}

class LobbyView extends _View {
  constructor() {
    super('lobby');
  }
}

class ViewController {
  static bodyElement: HTMLBodyElement | null = document
    .getElementsByTagName('body')
    .item(0);
  static lobbyView = new LobbyView();

  _currentView: _View;

  constructor() {
    let params = ViewController._params;
    if (!params.has('view') || params.get('view') === 'lobby') {
      this.setView(ViewController.lobbyView);
    }
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

  setView(view: _View): void {
    this._currentView = view;
    console.log('setting view');
    if (ViewController.bodyElement != null) {
      ViewController.bodyElement.className = view.bodyClassName;
    }
  }
}
