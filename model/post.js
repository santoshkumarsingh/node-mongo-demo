var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = new Schema({
  title: String,
  body: String,
  author: Number,
});

var Post = mongoose.model('posts', postsSchema);
module.exports = Post;
