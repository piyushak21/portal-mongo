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
const SignRouter = require("./routes/UserRoutes"); 
const LoginRouter = require("./routes/UserRoutes");
const ActivateRouter = require("./routes/UserRoutes");
const ForgotPasswordRouter = require("./routes/UserRoutes");
const ResetPasswordRouter = require("./routes/UserRoutes");
const LogoutRouter = require("./routes/UserRoutes"); // Not Working
const UpdateRouter = require("./routes/UserRoutes");
const DeleteRouter = require("./routes/UserRoutes");
const GetRouter = require("./routes/UserRoutes");
const AdminSignupRouter = require("./routes/AdminRoutes");
const AdminLoginRouter = require("./routes/AdminRoutes");
const AdminLogoutRouter = require("./routes/AdminRoutes"); // Not Working 
// const CompletedTripRouter = require("./routes/completedTrip.Routes");
 const VehiclesRouter = require("./routes/vehicles.Routes");
 const DevicesRouter = require("./routes/devices.Routes");
// const OngoingTripRouter = require("./routes/ongoingTrips.Routes");
//const CustomerRouter = require("./routes/customer.Routes");

 



// Middlewares
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
// app.use("/api/OngoingTrip", OngoingTripRouter);
//app.use("/api/Customers", CustomerRouter)



 

// Data-Base Connection Start
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));


//  Data-Base Connection End  

// Routes
//app.use(user);
//routes(app);

// Server Start 
app.listen(PORT, () => console.log("Server running on port " + PORT));