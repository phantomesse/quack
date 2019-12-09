// requires: buttons.js view-controller.js

decorateButtons();
let socket = io();
let viewController = new ViewController(socket);
