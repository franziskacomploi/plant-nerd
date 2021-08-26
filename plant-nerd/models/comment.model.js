const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  textField: {
    type: String,
    required: true,
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = model("Comment", CommentSchema, "comments");

module.exports = Comment;