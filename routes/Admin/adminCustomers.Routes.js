const express = require("express");
const UserRoutes = express.Router();
const UserController = require("../../controller/Admin/adminCustomers");


// SignUp user(Insert Data) Routes
UserRoutes.post("/UserSignup",UserController.userSignup);

UserRoutes.get("/GetUser",UserController.userGet);

module.exports = UserRoutes;