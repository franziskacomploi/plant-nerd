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
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }],
});

const Plant = model("Plant", PlantSchema, "plants");

module.exports = Plant;