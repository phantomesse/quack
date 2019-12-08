import Card from './card';
import fs from 'fs';
const path = require('path');

class Cards {
  static _filePrefix = path.join(__dirname, '../../src/data/');
  _easyCards: Card[];
  _hardCards: Card[];

  constructor() {
    this._easyCards = Cards._loadCards('easy');
    this._hardCards = Cards._loadCards('hard');
  }

  get easyCards(): Card[] {
    return Cards._shuffleCards(this._easyCards);
  }

  get hardCards(): Card[] {
    return Cards._shuffleCards(this._hardCards);
  }

  static _loadCards(fileName: string): Card[] {
    let data = fs.readFileSync(this._filePrefix + fileName + '.md', 'utf8');
    let cardData = data
      .split('\n**')
      .map(str => str.split('\n').filter(str => str.length > 0));
    return cardData.map(function(data) {
      let secretWord = data.shift();
      secretWord = secretWord.substring(0, secretWord.indexOf('**'));
      return new Card(secretWord, data);
    });
  }

  static _shuffleCards(cards: Card[]): Card[] {
    // Duplicate the cards.
    cards = [...cards];

    // Shuffle.
    for (let index = 0; index < cards.length; index++) {
      let randomIndex = Math.floor(Math.random() * (cards.length - index));

      // Swap cards with current index and random index.
      let tempCard = cards[index];
      cards[index] = cards[randomIndex];
      cards[randomIndex] = tempCard;
    }

    return cards;
  }
}

let cards: Cards = new Cards();
export default cards;
