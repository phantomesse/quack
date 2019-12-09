import express from 'express';
import socketIo from 'socket.io';
import { createServer } from 'http';
import sessionsController from './backend/sessions-controller';

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

  socket.on('add new session', function(data) {
    sessionsController
      .addSession(data.difficulty, data.rounds)
      .then(function(session) {
        console.log(session.id);
      });
  });

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});
