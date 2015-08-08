/// <reference path="typings/node/node.d.ts"/>
var express = require("express");
var http = require("http");
var pub = __dirname + '/public';
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var fs = require("fs");
var app = express();
var Post = require("./model/post");
var Comment = require("./model/comment");


app.set('port', process.env.PORT || 3000);

app.use(bodyParser());
mongoose.connect('mongodb://127.0.0.1/blog');

var db = mongoose.connection;
db.on('error', function () {

});
db.once('open', function () {
  console.log("connected");

});

// //load all files in models dir
// fs.readdirSync(__dirname + '/model').forEach(function(filename) {
//   if (~filename.indexOf('.js')) 
//     require(__dirname + '/model/' + filename)
// });

app.get('/users', function (req, res) {
  mongoose.model('users').find(function (err, users) {
    res.send(users);
  });
});

app.get('/posts/:userId', function (req, res) {
  mongoose.model('posts').find({ user: req.params.userId }, function (err, posts) {
    mongoose.model('posts').populate(posts, { path: 'user' }, function (err, posts) {
      res.send(posts);
    });
  });
});
app.post("/post", function (req, res) {
  Post.create({ title: req.body.title, body: req.body.body, author: 1 }, function (err, doc) {
    if (err)
      res.send("bad");
    else
      res.send("OK!");

  });

});
app.post("/comment/:pid", function (req, res) {
  var postId = req.params.pid;
  Post.findOne({ _id: postId }, function (err, post) {
    if (err)
      res.send("bad!");
    else {
      Comment.create({ body: req.body.body, author: 1, postId: postId }, function (err, doc) {
        res.send("done");
      });

    }

  });
});


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});