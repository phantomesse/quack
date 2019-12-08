import express from 'express';
import bodyParser from 'body-parser';
import sessions from './server/sessions';
import Team from './server/team';

const app: express.Application = express();
const port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', function(_, response) {
  response.render('pages/lobby', { sessionNames: sessions.sessionNames });
});

app.get('/new', function(_, response) {
  response.render('pages/new');
});

app.post('/new', bodyParser.json(), function(request, response) {
  sessions
    .addSession(request.query.difficulty, parseInt(request.query.rounds, 10))
    .then(function(sessionName) {
      response.send(sessionName);
      response.end();
    });
});

app.get('/join', function(request, response) {
  let sessionName = request.query.sessionName;
  if (!sessions.sessionNames.includes(sessionName)) {
    response.redirect('/');
    return;
  }

  let session = sessions.getSession(sessionName);
  if (session.areBothTeamsConnected) {
    response.redirect('/');
    return;
  }
  if (session.isOneTeamConnected) {
    session.team2 = new Team();
    response.render('pages/join-second-player');
    return;
  }
  session.team1 = new Team();
  response.render('pages/join-first-player');
});

app.get('/play', function(request, response) {
  let sessionName = request.query.sessionName;
  if (!sessions.sessionNames.includes(sessionName)) {
    response.redirect('/');
    return;
  }

  let session = sessions.getSession(sessionName);
  response.render('pages/play');
});

app.listen(port, function() {
  console.log(`Quack available at http://localhost:${port}!`);
});
