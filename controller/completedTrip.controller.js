const User  = require("../models/admin.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require('express');
//const jwt = require('jsonwebtoken');
const app = express();
const { generateJwtAdmin } = require("../auth/JWT");
var cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

const path = require("path");



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');
const Admin = require("../models/admin.model");