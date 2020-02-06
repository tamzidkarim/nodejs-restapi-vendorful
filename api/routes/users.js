const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const userController = require("../controllers/user");

//SIGN UP
router.post("/signup", userController.user_signup);

//LOGIN USER
router.post("/login", userController.user_login);

//DELETE USER
router.delete("/:userId", userController.user_delete);

module.exports = router;
