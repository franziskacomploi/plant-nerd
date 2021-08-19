const mongoose = require("mongoose");
const Plant = require("../models/plant.model");
const connectDB = require("../db/db");

const plants = [
{
name: "Cow Plant",
description: "Is your one and only source for oatmilk!", 
plantImg: "TestURL",
location: "Kreuzberg, Berlin, Germany", 
foundOnDate: "19.08.2021", 
season: "Summer"
}, 
{
name: "Hot Wine Stem",
description: "Is your one and only source for Hot Wine!", 
plantImg: "TestURL",
location: "Friedrichshain, Berlin, Germany", 
foundOnDate: "19.12.2021", 
season: "Winter"
},
{
  name: "Aloe Vera",
  description: "Not only nice to your skin but also to your missing ability to keep plants alive.", 
  plantImg: "TestURL",
  location: "Schöneberg, Berlin, Germany", 
  foundOnDate: "19.03.2021", 
  season: "Spring"
  },
  {
    name: "Sunflower",
    description: "Find your true flower power with this plant!", 
    plantImg: "TestURL",
    location: "Tempelhof, Berlin, Germany", 
    foundOnDate: "19.10.2021", 
    season: "Fall"
    },
]

connectDB()
  .then(() => {
    Plant.deleteMany().then(() => {
      Plant.create(plants).then((plants) => {
        console.log(`Created ${plants.length} Plants.`);
        mongoose.connection.close();
      });
    });
  })
  .catch((err) => {
    console.log("Error occured while inserting the Plants", err);
  });

  // run $node bin/seeds.js to get the seed into the database!