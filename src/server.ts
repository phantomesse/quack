import express from 'express';
// import socketIo from 'socket.io';
import { createServer } from 'http';

const app: express.Application = express();
app.set('port', process.env.PORT || 1337);
app.use(express.static('build/frontend'));

app.get('/', function(_, response) {
  response.send('index.html');
});

let server = createServer(app).listen(app.get('port'), function() {
  console.log(`Quack available at http://localhost:${app.get('port')}!`);
});
// let io = socketIo.listen(server);
