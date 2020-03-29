const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    name: {
      type: String,
      required: true,
      trim: true
    },
    ingredients: {
      type: [String],
      required: true,
      trim: true
    },
    cookTime: Number,
    pictureUrl: String,
    rating: Number
  },
  {
    // keeps record when is created and updated
    timestamps: true
  }
);

// const Author = model('Author', authorSchema);
// module.exports = Author;

module.exports = model('Recipe', recipeSchema);
