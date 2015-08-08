var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  body: String,
  author: Number,
  postId: mongoose.Schema.Types.ObjectId
});

var Comment=mongoose.model('comments', commentSchema);
module.exports=Comment;
