const uuidv4 = require('uuid/v4');

export default class Team {
  _id: string;
  points: number;

  constructor() {
    this._id = uuidv4();
    this.points = 0;
  }
}
