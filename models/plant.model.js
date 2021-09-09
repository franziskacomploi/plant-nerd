const {Schema, model} = require('mongoose');

const PlantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  plantImg: String,
  location: {
    type: String,
    required: true,
  },
  foundOnDate: {
    type: Date,
    required: true,
  },
  season: String,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

const Plant = model('Plant', PlantSchema, 'plants');

module.exports = Plant;
