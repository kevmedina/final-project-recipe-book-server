// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const recipeRouter = express.Router();

// ********* require Recipe model in order to use it for CRUD *********
const Recipe = require("../models/Recipe.model");
const RecipeBook = require("../models/RecipeBook.model");
const axios = require("axios");

// ****************************************************************************************
// POST route to create a new recipe in the DB
// ****************************************************************************************

// <form action="/recipes" method="POST">
recipeRouter.post("/add-recipe", (req, res, next) => {
  const { id, title, bookID, readyInMinutes, servings, image } = req.body;
  Recipe.create({
    author: req.user._id,
    id,
    title,
    ingredients: "",
    readyInMinutes,
    servings,
    image,
    favorite: false,
  })
    .then((recipe) =>
      RecipeBook.findByIdAndUpdate(
        bookID,
        {
          $push: { recipes: recipe },
        },
        { new: true }
      ).then((response) => res.status(200).json(response))
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET all Recipes from the DB
// ****************************************************************************************

recipeRouter.get("/recipes", (req, res, next) => {
  Recipe.find({ author: req.user._id }) // <-- .find() method gives us always an ARRAY back
    .then((recipesFromDB) => res.status(200).json(recipesFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET recipe by ID from DB and Delete
// ****************************************************************************************

recipeRouter.post("/recipe/delete", (req, res, next) => {
  const { recipeID, recipebookID } = req.body;
  RecipeBook.findByIdAndUpdate(
    recipebookID,
    { $pull: { recipes: recipeID } },
    { new: true }
  )
    .then(() =>
      Recipe.findByIdAndRemove(recipeID)
        .then((deletedRecipe) => {
          res.status(200).json(deletedRecipe);
        })
        .catch((err) =>
          console.log("Error while finding the recipe to delete: ", err)
        )
    )
    .catch((err) => console.log("Error while finding the recipe book: ", err));
});

// ****************************************************************************************
// GET recipe by ID from DB and Update favorite = true
// ****************************************************************************************

recipeRouter.post("/recipe/:recipeID/update", (req, res, next) => {
  const { recipeID } = req.params;
  Recipe.findByIdAndUpdate(
    recipeID,
    { $set: { favorite: true } },
    { new: true }
  )
    .then((updatedRecipe) => res.status(200).json(updatedRecipe))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET recipe by ID from DB
// ****************************************************************************************

recipeRouter.get("/recipes/:recipeID", (req, res, next) => {
  Recipe.findById(req.params.recipeID)
    .then((recipe) => res.status(200).json({ recipe }))
    .catch((err) => next(err));
});

// Get favorite recipes from DB
recipeRouter.get("/favorite-recipes", (req, res, next) => {
  Recipe.find({ author: req.user._id, favorite: true })
    .then((favoriteRecipes) => res.status(200).json(favoriteRecipes))
    .catch((err) =>
      console.log("Error while getting the favorite recipes: ", err)
    );
});

// Get recipe from external API
recipeRouter.post("/searchExternalAPI", (req, res, next) => {
  console.log("Front end: ", req.body);
  axios
    .get(
      `https://api.spoonacular.com/recipes/search?query=${req.body.recipe}&number=30&apiKey=${process.env.API_KEY}`
    )
    .then((recipesFromAPI) => {
      console.log(recipesFromAPI.data.results);
      res.status(200).json(recipesFromAPI.data.results);
    })
    .catch((err) => res.status(400).json({ message: err }));
});

// GET random food trivia
recipeRouter.post("/random-trivia", (req, res, next) => {
  axios
    .get(
      `https://api.spoonacular.com/food/trivia/random?apiKey=${process.env.API_KEY}`
    )
    .then((randomTrivia) => {
      res.status(200).json(randomTrivia.data);
    })
    .catch((err) =>
      console.log("Error while getting the random food trivia from API: ", err)
    );
});

// GET ingredients for recipe
recipeRouter.post("/get-ingredients/:id", (req, res, next) => {
  const { id } = req.params;
  axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.API_KEY}`
    )
    .then((ingredients) => {
      res.status(200).json(ingredients.data);
    })
    .catch((err) =>
      console.log("Error while getting the ingredients on server side: ", err)
    );
});

module.exports = recipeRouter;
