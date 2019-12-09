import cardsController from './cards-controller';
import https from 'https';
import Session from './session';

// Controller for handling sessions.
class SessionsController {
  static _sessionNameGeneratorUrl = 'https://animal-username.herokuapp.com/';
  _sessions: Map<string, Session>;

  constructor() {
    this._sessions = new Map();
  }

  // Returns existing session ids.
  // TODO: only return sessions that you can still join.
  get existingSessionIds(): string[] {
    return [...this._sessions.keys()];
  }

  getSession(sessionId: string) {
    return this._sessions.get(sessionId);
  }

  async addSession(difficulty: string, rounds: number) {
    let id = await SessionsController._createSessionId();
    let cards =
      difficulty === 'hard'
        ? cardsController.hardCards
        : cardsController.easyCards;
    let session = new Session(id, cards, rounds);
    this._sessions.set(id, session);
    return session;
  }

  static _createSessionId(): Promise<string> {
    return new Promise(function(resolve, reject) {
      https
        .get(SessionsController._sessionNameGeneratorUrl, function(response) {
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

let sessionsController: SessionsController = new SessionsController();
export default sessionsController;
