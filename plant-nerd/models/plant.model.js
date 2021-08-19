const { Schema, model } = require("mongoose");

const PlantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  latinName: {
    type: String,
    unique: true,
    required: true,
  },
  description: String, 
  plantImg: String,
  location: {
    type: String,
    unique: true,
    required: true,
  }, 
});

const Plant = model("Plant", PlantSchema, "plants");

module.exports = Plant;