import Card from './card';
import { Socket } from 'socket.io';

export default class Session {
  id: string;
  _cards: Card[];
  _roundsLeft: number;
  _teams: _Team[];

  constructor(id: string, cards: Card[], rounds: number) {
    this.id = id;
    this._cards = cards;
    this._roundsLeft = rounds;
    this._teams = [];
  }

  addTeam(socket: Socket): void {
    this._teams.push(new _Team(socket));
  }

  getOtherTeam(mySocket: Socket): _Team {
    return this._teams.filter(team => team.socket != mySocket)[0];
  }
}

class _Team {
  socket: Socket;
  points: number;

  constructor(socket: Socket) {
    this.socket = socket;
    this.points = 0;
  }
}
