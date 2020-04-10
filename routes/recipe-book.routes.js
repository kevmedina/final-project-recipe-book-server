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
router.post("/new-recipebook", (req, res) => {
  // console.log(req.body);
  const { param } = req.body;
  RecipeBook.create({ title: param, author: req.user._id })
    .then((RecipeBook) => res.status(200).json({ RecipeBook }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route to get all the recipe books
// ****************************************************************************************

router.get("/recipe-books", (req, res) => {
  RecipeBook.find()
    .then((recipeBooksFromDB) =>
      res.status(200).json({ books: recipeBooksFromDB })
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to delete the recipe book
// ****************************************************************************************

// <form action="/recipe-books/{{this._id}}/delete" method="post">
router.post("/recipe-books/:recipeBookId/delete", (req, res) => {
  RecipeBook.findByIdAndRemove(req.params.recipeBookId)
    .then(() => res.json({ message: "Successfully removed the recipe book!" }))
    .catch((err) => next(err));
});

// ****************************************************************************************
// POST route to save the updates
// ****************************************************************************************

// <form action="/recipe-books/{{foundBook._id}}/update" method="POST">
router.post("/recipe-books/:recipeBookId/update", (req, res) => {
  RecipeBook.findByIdAndUpdate(req.params.recipeBookId, req.body, { new: true })
    .then((updatedRecipeBook) =>
      res.status(200).json({ book: updatedRecipeBook })
    )
    .catch((err) => next(err));
});

// ****************************************************************************************
// GET route for getting the recipe book details
// ****************************************************************************************

router.get("/recipe-books/:recipeBookId", (req, res) => {
  RecipeBook.findById(req.params.recipeBookId)
    .populate("recipe")
    .then((RecipeBook) => res.status(200).json({ book: RecipeBook }))
    .catch((err) => next(err));
});

module.exports = router;
