const express = require("express");
const UserRoutes = express.Router();
const UserController = require("../controller/user.controller");


// SignUp user(Insert Data) Routes
UserRoutes.post("/signup",UserController.Signup);

// Login User Routes
UserRoutes.post("/login",UserController.Login);

// Forgot Passwword Routes
UserRoutes.post("/forgotPassword",UserController.ForgotPassword)

// Reset Password Routes
UserRoutes.post("/resetPassword",UserController.ResetPassword);

// User Activate
UserRoutes.post("/activate", UserController.Activate);

// Logout User Routes
UserRoutes.post("/logout",UserController.Logout); // Not Working

// Update User Routes
UserRoutes.put("/updateUser/:userId",UserController.UpdateUser);

// Delete User Routes
UserRoutes.delete("/deleteUser/:userId",UserController.DeleteUser);

// Get User Routes
UserRoutes.get("/getUser/:userId",UserController.GetUser);


module.exports = UserRoutes;