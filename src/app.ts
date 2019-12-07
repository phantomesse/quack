import express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 1337;

app.use(express.static('build/public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.get('/', function(_, response) {
  response.render('pages/lobby');
});

app.listen(port, function() {
  console.log(`Quack available at http://localhost:${port}!`);
});
