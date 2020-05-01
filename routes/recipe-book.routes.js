// ROUTES FILE NEEDS TO BE REQUIRED IN THE APP.JS IN ORDER NOT TO GIVE 404
// APP NEEDS TO KNOW YOU CREATED A NEW ROUTE FILE, THAT'S THE ONLY WAY FOR IT TO KNOW WHICH ROUTES YOU WANT TO HIT

const express = require("express");
const router = express.Router();

// ********* require Recipe and RecipeBook models in order to use them *********
// const Recipe = require('../models/Recipe.model');
const RecipeBook = require("../models/RecipeBook.model");

// ****************************************************************************************
// POST - create a recipe book
// ****************************************************************************************

// <form action="/recipe-books" method="POST">
router.post("/add-recipebook", (req, res, next) => {
  const { title } = req.body;
  RecipeBook.create({ title, author: req.user._id })
    .then(() =>
      RecipeBook.find().then((allRecipeBooks) =>
        res.status(200).json(allRecipeBooks)
      )
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the recipe books
// ****************************************************************************************

router.get("/recipe-books", (req, res) => {
  RecipeBook.find({author: req.user._id})
    .then((recipeBooksFromDB) => res.status(200).json(recipeBooksFromDB))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the recipe book
// ****************************************************************************************

// <form action="/recipe-books/{{this._id}}/delete" method="post">
router.post("/recipe-books/:recipeBookID/delete", (req, res, next) => {
  console.log("Recipe book ID: ", req.params.recipeBookID);
  RecipeBook.findByIdAndRemove(req.params.recipeBookID)
    .then(() =>
      RecipeBook.find({ author: req.user._id }).then((response) =>
        res.status(200).json(response)
      )
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/recipe-books/{{foundBook._id}}/update" method="POST">
router.post("/recipe-books/:recipeBookID/update", (req, res) => {
  RecipeBook.findByIdAndUpdate(req.params.recipeBookID, req.body, { new: true })
    .then((updatedRecipeBook) =>
      res.status(200).json({ book: updatedRecipeBook })
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipes for each book
// ****************************************************************************************

router.get("/recipe-books/:recipeBookID", (req, res) => {
  RecipeBook.findById(req.params.recipeBookID)
    .populate("recipes")
    .then((RecipeBook) => res.status(200).json(RecipeBook))
    .catch((err) => next(err));
});

module.exports = router;
