const mongoose = require("mongoose");
const User = require("../models/user.model");
const connectDB = require("../db/db");

const users = [
{
  username: "",
  password: "",
  description: "",
  favPlant: "",
  birthday: "",
  firstName: "",
}, 

]

connectDB()
  .then(() => {
    User.deleteMany().then(() => {
      User.create(users).then((users) => {
        console.log(`Created ${users.length} Users.`);
        mongoose.connection.close();
      });
    });
  })
  .catch((err) => {
    console.log("Error occured while inserting the Users", err);
  });

  // run $node bin/seeds.js to get the seed into the database!