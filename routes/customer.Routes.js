const express = require("express");
const CustomerRoutes = express.Router();
const CustomerController = require("../controller/customer.controller");


// //get all customers
// CustomerRoutes.get("/getAll/:user_id", CustomerController.getall);

// //add customers data
CustomerRoutes.post("/add-Customer/:user_id", CustomerController.addCustomer);

// //update customers data
// CustomerRoutes.put("/edit-Customer/:customer_id", CustomerController.editCustomer);

// //get all users for admin
// CustomerRoutes.get("/getall", CustomerController.getallusers);

// //add users
// CustomerRoutes.post("/add-User", CustomerController.addUsers);

// //Edit users
// CustomerRoutes.put("/edit-User/:user_id", CustomerController.editUser);

// // get Particular User
// CustomerRoutes.get("/get-User/:user_id", CustomerController.getuserById);

// // Get customer details
// CustomerRoutes.get("/get-Customer-Details/:user_id", CustomerController.getCustomerDetailByUserId);

 module.exports = CustomerRoutes;
