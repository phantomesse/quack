import { Socket } from 'socket.io';

const uuidv4 = require('uuid/v4');

export default class Team {
  _id: string;
  socket: Socket;
  points: number;

  constructor(socket: Socket) {
    this._id = uuidv4();
    this.socket = socket;
    this.points = 0;
  }
}
