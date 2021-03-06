const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {}
    author: { type: Schema.Types.ObjectId, ref: "User" },
    id: Number,
    title: {
      type: String,
      trim: true,
    },
    ingredients: {
      type: String,
      trim: true,
    },
    bookID: {
      type: Schema.Types.ObjectId,
      ref: "RecipeBook",
    },
    readyInMinutes: Number,
    servings: Number,
    image: {
      type: String,
      default: "./default-recipe.png",
    },
    favorite: Boolean,
  },
  {
    // keeps record when is created and updated
    timestamps: true,
  }
);

// const Recipe = model('Recipe', RecipeSchema);
// module.exports = Recipe;

module.exports = model("Recipe", recipeSchema);
