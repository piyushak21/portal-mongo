const express = require("express");
const router = express.Router();
const AuthController = require("../controller/user.controller");

router.post("/signup",AuthController.Signup);

router.post("/login",AuthController.Login);

router.post("/logout",AuthController.Logout);


module.exports = router;