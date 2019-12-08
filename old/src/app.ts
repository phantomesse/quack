import express from 'express';
import bodyParser from 'body-parser';
import sessions from './server/sessions';
import Team from './server/team';
import socketIo from 'socket.io';
import { createServer, Server } from 'http';

const app: express.Application = express();
app.set('port', process.env.PORT || 1337);

let server = createServer(app).listen(app.get('port'), function() {
  console.log(`Quack available at http://localhost:${app.get('port')}!`);
});
let io = socketIo.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('build/public'));
app.use(express.static('src/sounds'));
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

app.get('/play', function(request, response) {
  let sessionName = request.query.sessionName;
  if (!sessions.sessionNames.includes(sessionName)) {
    response.redirect('/');
    return;
  }

  let session = sessions.getSession(sessionName);
  response.render('pages/play', { sessionName: sessionName });

  io.sockets.on('connection', function(socket) {
    console.log('someone connected in session ' + sessionName);

    // if (session.teams.length === 2) {
    //   io.sockets.emit('too many connected');
    // }

    let team = new Team(socket);
    session.teams.push(team);

    if (session.teams.length === 1) {
      socket.emit('show waiting screen');
    } else if (session.teams.length === 2) {
      socket.emit('show join screen');
    }

    socket.on('start', function() {
      console.log('start game');
      socket.emit('show cards screen', session.nextCard);
      session.teams
        .filter(sessionTeam => sessionTeam !== team)[0]
        .socket.emit('show buzzer screen');
    });

    io.sockets.on('disconnect', function() {});
  });
});
