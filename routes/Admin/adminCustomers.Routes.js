const express = require("express");
const UserRoutes = express.Router();
const UserController = require("../../controller/Admin/adminCustomers");


// SignUp user(Insert Data) Routes
UserRoutes.post("/UserSignup",UserController.userSignup);

// Get User Routes
UserRoutes.get("/GetUser",UserController.userGet);

// Update User Routes
UserRoutes.put("/updateUser/:userId",UserController.UpdateUser);

// Delete User Routes
UserRoutes.delete("/deleteUser/:userId",UserController.DeleteUser);

module.exports = UserRoutes;