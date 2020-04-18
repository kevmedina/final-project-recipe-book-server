const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const recipeBookSchema = new Schema(
  {
    // unless you are defining more than the "type" property, you don't have to use {} (see below)
    // firstName: {type: String, require: true}
    title: { type: String, required: true },
    // we want to reference recipes inside the recipe book model and for that we will use their IDs
    // this is telling us that in "recipe" property of each recipe book object, we will have
    // saved ObjectId (id that is automatically generated by MongoDB) that belongs to one of the recipes from the recipes collection
    author: { type: Schema.Types.ObjectId, ref: "User" },
    recipes: { type: [{ type: Schema.Types.ObjectId, ref: "Recipe" }] },
  },
  {
    timestamps: true,
  }
);

// const Recipe = model('Recipe', authorSchema);
// module.exports = Recipe;

module.exports = model("RecipeBook", recipeBookSchema);
