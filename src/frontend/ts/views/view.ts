abstract class View {
  viewController: ViewController;
  viewName: string;

  constructor(viewController: ViewController, bodyClassName: string) {
    this.viewController = viewController;
    this.viewName = bodyClassName;
  }
}
