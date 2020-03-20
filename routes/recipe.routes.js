// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require('express');
const recipeRouter = express.Router();

// ********* require Author model in order to use it for CRUD *********
const Recipe = require('../models/Recipe.model');

// ****************************************************************************************
// POST route to create a new author in the DB
// ****************************************************************************************

// <form action="/recipes" method="POST">
recipeRouter.post('/recipes', (req, res, next) => {
  console.log(req.body);
  Recipe.create(req.body)
    .then(RecipeDoc => res.status(200).json(RecipeDoc))
    .catch(err => next(err));
});

// ****************************************************************************************
// GET all Recipes from the DB
// ****************************************************************************************

recipeRouter.get('/Recipes', (req, res, next) => {
  Recipe.find() // <-- .find() method gives us always an ARRAY back
    .then(RecipesFromDB => res.status(200).json({ Recipes: RecipesFromDB }))
    .catch(err => next(err));
});

module.exports = recipeRouter;
