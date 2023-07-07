const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require("cors");
var bodyParser = require('body-parser');
const PORT = process.env.PORT 

//const getMqttData = require("./controller/tripMqtt.controller")

app.use(express.json());
app.use(cors());
//getMqttData();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Middlewares

const UserSignupRouter = require("./routes/Admin/adminCustomers.Routes")
const UserGetRouter = require("./routes/Admin/adminCustomers.Routes") 
const UserUpdateRouter = require("./routes/Admin/adminCustomers.Routes");
const UserDeleteRouter = require("./routes/Admin/adminCustomers.Routes")
//const UserGetGlobelRouter = require("./routes/Admin/devices.Routes")

const SignRouter = require("./routes/Customers/User.Routes"); 
const LoginRouter = require("./routes/Customers/User.Routes");
const ActivateRouter = require("./routes/Customers/User.Routes");
const ForgotPasswordRouter = require("./routes/Customers/User.Routes");
const ResetPasswordRouter = require("./routes/Customers/User.Routes");
const LogoutRouter = require("./routes/Customers/User.Routes"); // Not Working
const UpdateRouter = require("./routes/Customers/User.Routes");
const DeleteRouter = require("./routes/Customers/User.Routes");
const GetRouter = require("./routes/Customers/User.Routes");
const AdminSignupRouter = require("./routes/Admin/Admin.Routes");
const AdminLoginRouter = require("./routes/Admin/Admin.Routes");
const AdminLogoutRouter = require("./routes/Admin/Admin.Routes"); // Not Working 
// const CompletedTripRouter = require("./routes/completedTrip.Routes");
const VehiclesRouter = require("./routes/Customers/vehicles.Routes");
const DevicesRouter = require("./routes/Admin/devices.Routes");
const DriverRouter  = require("./routes/Customers/driver.Routes");
const RFIDRouter = require("./routes/Customers/RFID.Routes");
const ContactRouter = require("./routes/Customers/contacts.Routes");
// const OngoingTripRouter = require("./routes/ongoingTrips.Routes");
//const CustomerRouter = require("./routes/customer.Routes");

//===========Driver-Reports==============//
const ReportsRouter = require("./routes/Customers/reports.Routes");

//  const UserRouter = require("./routes/User.Routes");
//  const AdminRouter = require("./routes/Admin.Routes");
//  const DevicesRouter = require("./routes/devices.Routes");
//  const VehiclesRouter = require("./routes/vehicles.Routes");
//  const OngoingTripRouter = require("./routes/ongoingTrips.Routes");

// app.use("/user",UserRouter);
// app.use("/admin",AdminRouter);
// app.use("/device",DevicesRouter);
// app.use("/vehicle",VehiclesRouter);



// Middlewares
app.use("/api/Signup",UserSignupRouter);
app.use("/api/Get",UserGetRouter);
app.use("/api/Update", UserUpdateRouter);
app.use("/api/UserDelete", UserDeleteRouter);
//app.use("/api/globel",UserGetGlobelRouter);
app.use("/api/Signup", SignRouter);
app.use("/api/Login", LoginRouter);
app.use("/api/Activate", ActivateRouter);
app.use("/api/ForgotPassword", ForgotPasswordRouter);
app.use("/api/ResetPassword", ResetPasswordRouter);
//*****************************Update the marge all router api lines on single****************************************
app.use("/api/Logout", LogoutRouter); // Not Working
app.use("/api/UpdateUser", UpdateRouter);
app.use("/api/Delete", DeleteRouter);
app.use("/api/Get", GetRouter);
app.use("/api/Adminsignup", AdminSignupRouter);
app.use("/api/Adminlogin", AdminLoginRouter);
app.use("/api/Adminlogout", AdminLogoutRouter); // Not Working
// app.use("/api/CompletedTrip", CompletedTripRouter);
 app.use("/api/Vehicles", VehiclesRouter);
 app.use("/api/Devices", DevicesRouter);
 app.use("/api/Drivers", DriverRouter);
 app.use("/api/DriverRFID", RFIDRouter);
 app.use("/api/addContacts", ContactRouter);

// app.use("/api/OngoingTrip", OngoingTripRouter);
//app.use("/api/Customers", CustomerRouter)

 //================{Reports}====================//
 app.use("/api/Reports", ReportsRouter);

 

// Data-Base Connection Start
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DataBase Mongodb Connected To the Server..."))
    .catch((err) => console.error(err));


//  Data-Base Connection End  

// Routes
//app.use(user);
//routes(app);

// Server Start 
app.listen(PORT, () => console.log("Server running on port " + PORT));