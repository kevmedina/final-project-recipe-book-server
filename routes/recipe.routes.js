// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const recipeRouter = express.Router();

// ********* require Recipe model in order to use it for CRUD *********
const Recipe = require("../models/Recipe.model");

// ****************************************************************************************
// POST route to create a new recipe in the DB
// ****************************************************************************************

// <form action="/recipes" method="POST">
recipeRouter.post("/recipe", (req, res, next) => {
  console.log(req.body);
  Recipe.create(req.body)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET all Recipes from the DB
// ****************************************************************************************

recipeRouter.get("/recipes", (req, res, next) => {
  Recipe.find() // <-- .find() method gives us always an ARRAY back
    .then(recipesFromDB => res.status(200).json({ recipes: recipesFromDB }))
    .catch(err => next(err));
});
// ****************************************************************************************
// GET recipe by ID from DB and Delete
// ****************************************************************************************

recipeRouter.post("/recipes/:recipeID/delete", (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.recipeID)
    .then(deletedRecipe => console.log("deleted recipe: ", deletedRecipe))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET recipe by ID from DB and Update
// ****************************************************************************************
recipeRouter.get("/recipes/:recipeID/update", (req, res, next) => {
  Recipe.findByIdAndUpdate(req.params.recipeID, req.body, { new: true })
    .then(updatedRecipe => res.status(200).json({ recipe: updatedRecipe }))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET recipe by ID from DB
// ****************************************************************************************
recipeRouter.get("/recipes/:recipeID", (req, res, next) => {
  Recipe.findById(req.params.recipeID)
    .then(recipe => res.status(200).json({ recipe }))
    .catch(err => next(err));
});

module.exports = recipeRouter;
