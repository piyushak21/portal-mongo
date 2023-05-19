const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require("cors");
var bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT 

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middlewares
const SignRouter = require("./routes/UserRoutes"); 
const LoginRouter = require("./routes/UserRoutes");
const LogoutRouter = require("./routes/UserRoutes");
const AdminSignupRouter = require("./routes/AdminRoutes");
const AdminLoginRouter = require("./routes/AdminRoutes");
const AdminLogoutRouter = require("./routes/AdminRoutes");

 



// Middlewares
app.use("/api/Signup", SignRouter);
app.use("/api/login", LoginRouter);
app.use("/api/logout", LogoutRouter);
app.use("/api/Adminsignup", AdminSignupRouter);
app.use("/api/Adminlogin", AdminLoginRouter);
app.use("/api/Adminlogout", AdminLogoutRouter);







app.use(express.json()); 
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));

// Routes
//app.use(user);
//routes(app);
app.listen(PORT, () => console.log("Server running on port " + PORT));