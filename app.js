var low = require('lowdb')
var express = require('express');
var bodyParser = require('body-parser');

var db = low('db.json')

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  	extended: true
})); 

// Get Size
app.get('/notes/size', function (req, res) {
	res.json({"count" : db('notes').size()});
});

// Get All
app.get('/notes', function(req, res){
	res.send(db('notes'));
});

// Get One
app.get('/notes/:id', function(req, res){
	res.send(db('notes').where({id: req.params.id}));
});

// Create New
app.post('/notes', function (req, res) {
	db('notes').push({id: req.body.id, title: req.body.title, content: req.body.content});
	res.send("created");
});

// Update Existing
app.put('/notes/:id', function(req, res){
	db('notes')
	.chain()
  	.find({ id: req.params.id })
  	.assign({ title: req.body.title, content: req.body.content })
	.value();
	res.send("updated");
});

// application -------------------------------------------------------------
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var server = app.listen(3000, function () {
  	var host = server.address().address;
	var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
});