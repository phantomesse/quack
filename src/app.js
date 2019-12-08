"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var sessions_1 = require("./server/sessions");
var team_1 = require("./server/team");
var app = express_1["default"]();
var port = process.env.PORT || 1337;
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
app.use(express_1["default"].static('build/public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.get('/', function (_, response) {
    response.render('pages/lobby', { sessionNames: sessions_1["default"].sessionNames });
});
app.get('/new', function (_, response) {
    response.render('pages/new');
});
app.post('/new', body_parser_1["default"].json(), function (request, response) {
    sessions_1["default"]
        .addSession(request.query.difficulty, parseInt(request.query.rounds, 10))
        .then(function (sessionName) {
        response.send(sessionName);
        response.end();
    });
});
app.get('/join', function (request, response) {
    var sessionName = request.query.sessionName;
    if (!sessions_1["default"].sessionNames.includes(sessionName)) {
        response.redirect('/');
        return;
    }
    var session = sessions_1["default"].getSession(sessionName);
    if (session.areBothTeamsConnected) {
        response.redirect('/');
        return;
    }
    if (session.isOneTeamConnected) {
        session.team2 = new team_1["default"]();
        response.render('pages/join-second-player');
        return;
    }
    session.team1 = new team_1["default"]();
    response.render('pages/join-first-player');
});
app.get('/play', function (request, response) {
    var sessionName = request.query.sessionName;
    if (!sessions_1["default"].sessionNames.includes(sessionName)) {
        response.redirect('/');
        return;
    }
    var session = sessions_1["default"].getSession(sessionName);
    response.render('pages/play');
});
app.listen(port, function () {
    console.log("Quack available at http://localhost:" + port + "!");
});
