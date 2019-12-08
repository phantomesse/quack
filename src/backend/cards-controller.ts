const path = require('path');

// Controller for retrieving card data.
class CardsController {
  static _filePrefix = path.join(__dirname, '../data/');

  constructor() {}
}

let cardsController: CardsController = new CardsController();
export default cardsController;
