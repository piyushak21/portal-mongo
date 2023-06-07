const express = require("express");
const AdminRoutes = express.Router();
const AdminController = require("../controller/admin.controller");

// Admin Sign-up Routes
AdminRoutes.post("/signup",AdminController.Signup);

//Admin  Login Routes
AdminRoutes.post("/login",AdminController.Login);

//Admin Logout Routes
AdminRoutes.post("/logout",AdminController.Logout); // Not Working


module.exports = AdminRoutes;