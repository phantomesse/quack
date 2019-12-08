import https from 'https';
import Team from './team';
import Card from './card';

const _sessionNameGeneratorUrl = 'https://animal-username.herokuapp.com/';

export default class Session {
  sessionName: string;
  _cards: Card[];
  _roundsLeft: number;
  teams: Team[];

  constructor(sessionName: string, cards: Card[], rounds: number) {
    this.sessionName = sessionName;
    this._cards = cards;
    this._roundsLeft = rounds;
    this.teams = [];
  }

  get nextCard(): Card {
    return this._cards.shift();
  }

  static async createSessionName(): Promise<string> {
    return new Promise(function(resolve, reject) {
      https
        .get(_sessionNameGeneratorUrl, function(response) {
          response.on('data', function(data) {
            resolve(JSON.parse(data));
          });
        })
        .on('error', function(error) {
          reject(error);
        });
    });
  }
}
