import express from 'express';
import socketIo from 'socket.io';
import { createServer } from 'http';
import sessionsController from './backend/sessions-controller';
import Session from './backend/session';

const app: express.Application = express();
app.set('port', process.env.PORT || 1337);
app.use(express.static('build/frontend'));

app.get('/', function(_, response) {
  response.send('index.html');
});

let server = createServer(app).listen(app.get('port'), function() {
  console.log(`Quack available at http://localhost:${app.get('port')}!`);
});
let io = socketIo.listen(server);

io.sockets.on('connection', function(socket) {
  console.log('user connected');
  let session: Session;

  socket.on('get existing sessions', function() {
    socket.emit(
      'update existing sessions',
      sessionsController.existingSessionIds
    );
  });

  socket.on('get session id', function() {
    socket.emit(
      'update session id',
      session === undefined ? 'N/A' : session.id
    );
  });

  socket.on('add new session', function(data) {
    sessionsController
      .addSession(data.difficulty, data.rounds)
      .then(function(addedSession) {
        session = addedSession;
        io.emit(
          'update existing sessions',
          sessionsController.existingSessionIds
        );
        socket.emit('update session id', session.id);
      });
  });

  socket.on('join session', function(sessionId) {
    console.log('joining ' + sessionId);
    session = sessionsController.getSession(sessionId);
    socket.emit('update session id', session.id);
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
