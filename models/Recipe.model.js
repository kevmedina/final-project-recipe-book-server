const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {}
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
    directions: String,
    cookTime: Number,
    pictureUrl: String,
    rating: Number
  },
  {
    // keeps record when is created and updated
    timestamps: true
  }
);

// const Recipe = model('Recipe', RecipeSchema);
// module.exports = Recipe;

module.exports = model('Recipe', recipeSchema);
