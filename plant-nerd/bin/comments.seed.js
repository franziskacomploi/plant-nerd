const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
const connectDB = require("../db/db");

const comments = [
{
title: "",
textField: "",
author: "",
}, 
]

connectDB()
  .then(() => {
    Comment.deleteMany().then(() => {
      Comment.create(comments).then((comments) => {
        console.log(`Created ${comments.length} Comments.`);
        mongoose.connection.close();
      });
    });
  })
  .catch((err) => {
    console.log("Error occured while inserting the Comments", err);
  });

  // run $node bin/seeds.js to get the seed into the database!