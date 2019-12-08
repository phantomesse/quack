import Session from './session';

class Sessions {
  _sessions: Map<string, Session>;

  constructor() {
    this._sessions = new Map();
  }

  get sessionNames(): string[] {
    return [...this._sessions.keys()];
  }

  async addSession(difficulty: string, rounds: number): Promise<string> {
    let sessionName = await Session.createSessionName();
    this._sessions.set(sessionName, new Session(sessionName, rounds));
    return sessionName;
  }

  getSession(sessionName: string): Session {
    return this._sessions.get(sessionName);
  }
}

let sessions: Sessions = new Sessions();
export default sessions;
