const { Schema, model } = require("mongoose");

const PlantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String, 
  plantImg: String,
  location: {
    type: String,
    unique: true,
    required: true,
  }, 
  foundOnDate: String, 
  season: String,
});

const Plant = model("Plant", PlantSchema, "plants");

module.exports = Plant;