import Card from './card';

export default class Session {
  id: string;
  _cards: Card[];
  _roundsLeft: number;

  constructor(id: string, cards: Card[], rounds: number) {
    this.id = id;
    this._cards = cards;
    this._roundsLeft = rounds;
  }
}
