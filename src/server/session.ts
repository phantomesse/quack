import https from 'https';
import Team from './team';

const _sessionNameGeneratorUrl = 'https://animal-username.herokuapp.com/';

export default class Session {
  sessionName: string;
  roundsLeft: number;
  team1: Team;
  team2: Team;

  constructor(sessionName: string, rounds: number) {
    this.sessionName = sessionName;
    this.roundsLeft = rounds;
  }

  get isOneTeamConnected(): boolean {
    if (this.areBothTeamsConnected) return false;
    return this.team1 != undefined || this.team2 != undefined;
  }

  get areBothTeamsConnected(): boolean {
    return this.team1 != undefined && this.team2 != undefined;
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
