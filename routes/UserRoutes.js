const express = require("express");
const UserRoutes = express.Router();
const UserController = require("../controller/user.controller");


// SignUp user(Insert Data) Routes
UserRoutes.post("/signup",UserController.Signup);

// Login User Routes
UserRoutes.post("/login",UserController.Login);

// Logout User Routes
UserRoutes.post("/logout",UserController.Logout); // Not Working


module.exports = UserRoutes;