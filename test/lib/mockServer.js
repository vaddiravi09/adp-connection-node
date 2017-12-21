
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var i = 0;

app.post('/token', function testeventCb(req, res) {
	if(i % 2 === 0) {
		var resp = {access_token: 1, expires_in: 3600};
		if (req.body.grant_type === 'authorization_code') {
			resp = {access_token: 1, refresh_token: 2, expires_in: 3600};
		}
		res.status(200).send(resp);
	} else {
		res.status(500).send({error: 1});
	}
	i++;
});

app.get('/api', function testeventCb(req, res) {
	res.status(200).send({value: 1});
});

app.get('/authorize', function testeventCb(req, res) {
	res.status(200).send({value: 1});
});

var server;

function start(cb) {
	server = app.listen(55555, cb);
}

function stop(cb) {
	if(typeof server.close === 'function') server.close(cb);
}

function resetLoop() {
	i = 0;
}

module.exports = {
	start: start,
	stop: stop,
	resetLoop: resetLoop
};
