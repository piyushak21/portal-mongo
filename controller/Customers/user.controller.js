const Users  = require("../../models/Customers/user.model");
const express = require('express');
app = express();
//const jwt = require('jsonwebtoken');
const { generateJwt } = require("../../auth/JWT");
const storage = require("node-sessionstorage");
const bodyPar = require("body-parser");
const nodemailer = require('nodemailer');
//const { sendEmail } = require("../auth/EMAIL");

app.use(bodyPar.urlencoded({ extended: true }));
app.use(bodyPar.json());



//========Generate a new unique UUID===========//
const { v4: uuidv4 } = require('uuid');

//======================================={Sign-Up / Add/ Insert User} [START]===========================================//
exports.Signup = async (req, res) => {
  try {

    const {first_name, last_name, full_name, username, email, password, confirmPassword, user_type, status } = req.body;
    const { company_name, address, state, city, pincode, phone} = req.body;
//--------------------Check Existing Email---------------------//
    const existingCustomerEmail = await Users.findOne({ email}); 
//--------------------Check Existing User Name-----------------//
    const existingCustomerUserName = await Users.findOne({  username });
//--------------------Check Existing Phone---------------------//
    const existingCustomerPhone = await Users.findOne({  phone });
    

    if (existingCustomerEmail ) {
      return res.status(500).send('This Email Already Taken ');
    }
    else if ( existingCustomerUserName) {
      return res.status(500).send('This User Name Already Taken');
    }
    else if ( existingCustomerPhone) {
      return res.status(500).send('This Phone Number Already Taken');
    }

     //---------------------Check filed's required---START-----------------------------------------//
      if  (!first_name) { 
      return res.status(400).json({ message: 'FIRST_NAME is required' });
    } else if  (!last_name) { 
      return res.status(400).json({ message: 'LAST_NAME is required' });
    } else if  (!full_name) { 
      return res.status(400).json({ message: 'FULL_NAME is required' });
    } else if  (!email) {
      return res.status(400).json({ message: 'EMAIL is required' });
    } else if  (!phone) {
      return res.status(400).json({ message: 'PHONE Numberis required' });
    } else if  (!username) {
      return res.status(400).json({ message: 'USER_NAME is required' });
    } else if  (!password) {
      return res.status(400).json({ message: 'PASSWORD is required' });
    } else if  (!confirmPassword) {
      return res.status(400).json({ message: 'CONFIRM_PASSWORD is required' });
    } else if  (!user_type) {
      return res.status(400).json({ message: 'user_type is required' });
    } else if  (!status) {
      return res.status(400).json({ message: 'status is required' });
    }  else if  (!company_name) { 
      return res.status(400).json({ message: 'COMPANY_NAME is required' }); 
    }  else if  (!address) { 
      return res.status(400).json({ message: 'ADDRESS is required' });
    }  else if  (!state) { 
      return res.status(400).json({ message: 'STATE is required' });
    }  else if  (!city) { 
      return res.status(400).json({ message: 'CITY is required' });
    }  else if  (!pincode) { 
      return res.status(400).json({ message: 'PINCODE is required' });
    }  else if  (!phone) { 
      return res.status(400).json({ message: 'PHONE is required' });
    }
//---------------------Check filed's required---END----------------------------------------------------//

//-------------------------Check if password and confirm password match--------------------------//
    else if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: 'Password and confirm password do not match' });
    } 
    
//--------------------------Hash the password And Confirm Password-------------------------------//
    const hashedPassword = await Users.hashPassword(password, 10);
    const confirmHashPassword = await Users.hashPassword(confirmPassword,10);

    //==============Generate a new unique UUID=============//
    const id = uuidv4();
   // const userId = id();

    let code = Math.floor(100000 + Math.random() * 900000);
   
    let expiry = Date.now() + 60 * 1000 * 120; //120 mins in ms

    //const sendCode = await sendEmail(email, code, 1);
  
    console.log('code',code);

    const newUser = new Users({
      userId: id,
      first_name,
      last_name,
      full_name,
      username,
      email,
      password: hashedPassword, 
      confirmPassword: confirmHashPassword,
      user_type,
      status,
      company_name,
      address,
      state,
      city,
      pincode,
      phone,
    //  timestamps: {
    //   createdAt: "createdAt",
    //   updatedAt: "updatedAt",
    // },
    });

    // const userdetails = new Customer({
    //   id: userId,
    //   company_name,
    //   address,
    //   state,
    //   city,
    //   pincode,
    //   phone,
    //   created_at: new Date(),
    // });


    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
    res.status(200).json({ code: 200, message: 'User Added Successfully', addUser: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add User' });
  }
};
//======================================={Sign-Up / Add/ Insert User} [END]=============================================//

//============================================{User Login} [START]======================================================//
exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;
// ************************Upcoming update in add user login with email/username/phone**************************//

//====================1. Find if any account with that email exists in DB=====================//
    var user = await Users.findOne({ email: email });
    await Users.findOne({ email: email })
      .then((data) => {
        console.log(data, "okkkk");
      })
      .catch((err) => {
        console.log(err, "errrorrrrr");
      });
 // NOT FOUND - Throw error //
    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Wrong Email",
        data: {},
      });
    }
 //========================2. Throw error if account is not activated===========================//
//  if (!user.active) {
//   return res.status(403).json({
//     statuscode: 403,
//     status: "Failed",
//     message: "You must verify your email to activate your account",
//     data: {},
//   });
// }
//============================All Fileds Are Mandatory================================//
    if (!email || !password) {
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Enter All Credentials Mandatory",
        data: {},
      });
    }

//====================Paswword convert into bcrypt===========================//

const isValid = await Users.comparePasswords(password, user.password);
console.log("password", password);

if (!isValid) {
  return res.status(401).json({
    statuscode: 401,
    status: "Unauthorized",
    message: "Invalid  password",
    data: {},
  });
}

//=====================Generate JWT Token==========================//
    const {error, token } = await generateJwt(user.email, user.userId);
    user.accessToken = token;
   // const token = jwt.sign({ email: user.email, userId: user.userId }, 'secretKey');
   if (error) {
    return res.status(501).json({
      statuscode: 501,
      status: "Error",
      message: "Couldn't create access token. Please try again later",
      data: {},
    });
  }
  const currentTimeStamp = new Date().getTime();
  await user.save();
  user.accessToken = token;
 // user.userIP = userIP;

  if (user.blockTimeStamp < currentTimeStamp) {
    user.userActivity = true
    //user.wrongSecondPassword = 0;
    await user.save();
  }

  storage.setItem("email", user.email);

    return res.status(200).json({
      statuscode: 200, 
      status: "OK",
      message: "User Logged In Successfully",
      accessToken: token,
      data: {
        active:user.active,
        userId: user.userId,
        email: user.email,
        full_name: user.full_name,
        password:user.password

      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: "Couldn't login. Please try again later.",
      data: {},
    });
  }
};
//============================================{User Login} [END]========================================================//

//============================================{User Activate} [START]===================================================//
exports.Activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Please make a valid request",
        data: {},
      });
    }

    const user = await Users.findOne({
      email,
      emailToken: code,
      emailTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        statuscode: 401,
        status: "Failed",
        message: "Invalid details",
        data: {},
      });
    }

    if (user.active) {
      return res.status(402).json({
        statuscode: 402,
        status: "Failed",
        message: "Account already activated",
        data: {},
      });
    }

    user.emailToken = "";
    user.emailTokenExpires = null;
    user.active = true;
    user.otpmode = true;

    await user.save();

    // Generate JWT token
    const token = generateJwtToken(user.email, user.userId);
    if (!token) {
      return res.status(410).json({
        statuscode: 410,
        status: "Not Found",
        message: "Could not create token",
        data: {},
      });
    }

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Account activated",
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error("activation-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {},
    });
  }
};
//============================================{User Activate} [END]=====================================================//

//============================================{Forgot-Password} [START]=================================================//
exports. ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({
        statuscode: 400,
        status: "Failed",
        message: "Cannot be processed",
        data: {},
      });
    }
    const user = await Users.findOne({
      email: email,
    });
    if (!user) {
      return res.send({
        statuscode: 401,
        status: "Not Found",
        message: "User Not Registered",
        data: {},
      });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    console.log('code',code);
    // let response = await sendEmail(user.email, code, 2);

    // if (response.error) {
    //   return res.status(501).json({
    //     statuscode: 501,
    //     status: "Error",
    //     message: "Couldn't send mail. Please try again later.",
    //   });
    // }

    let expiry = Date.now() + 60 * 1000 * 15;
    user.resetPasswordToken = code;
    user.resetPasswordExpires = expiry; // 15 minutes

    await user.save();

    return res.send({
      statuscode: 200,
      status: "OK",
      message: "OTP Sent To Registered Email To Reset Your Password",
    });
  } catch (error) {
    console.error("forgot-password-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
    });
  }
};
//============================================{Forgot-Password} [END]===================================================//

//============================================{Reset-Password} [START]==================================================//
exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword) {
      return res.status(400).json({
        statuscode: 400,
        status: "Not Process",
        message: "Couldn't process request. Please provide all mandatory fields",
      });
    }
    const user = await Users.findOne({
      resetPasswordToken: token,
      //resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Failed",
        message: "Password Reset Token Is Invalid or Has Expired.",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        statuscode: 401,
        status: "Failed",
        message: "Passwords Didn't Match",
      });
    }
    const hash = await Users.hashPassword(req.body.newPassword);
    if (!hash) {
      throw new Error("Failed to hash password");
    }
    user.password = hash;
    user.resetPasswordToken = null;
   // user.resetPasswordExpires = "";

    await user.save();

    // const sendStatus = await sendResetPasswordEmail(user.email);
    // if (sendStatus.error) {
    //   return res.status(501).json({
    //     statuscode: 501,
    //     status: "Error",
    //     message: "Couldn't send mail. Please try again later.",
    //   });
    // }

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Password Has Been Reset Successfully",
    });
  } catch (error) {
    console.error("reset-password-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
    });
  }
};

//============================================{Reset-Password} [END]====================================================//

//============================================{User-Logout} [START]=====================================================//
exports.Logout = async (req, res) => {
  try {
    const { id } = req.body;
    //const { id } = req.decoded;
   
    let user = await Users.findOne({ userId: id });
    console.log(id);

    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        status: "Not Found", 
        message: "User not found",
        data: {},
      });
    }

    user.accessToken = "";

    await user.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "User logged out successfully",
      data: {},
    });
  } catch (error) {
    console.error("user-logout-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {}
    });
  }
}; 
//============================================{User-Logout} [END]=======================================================//

//============================================{Upadte- User-Exp} [START]================================================//
exports.UpdateUser1 = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const {
      first_name,
      last_name,
      full_name,
      username,
      email,
      user_type,
      status,
      company_name,
      address,
      state,
      city,
      pincode,
      phone
    } = req.body;

    const updatedUser = await Users.findOneAndUpdate( {userId},
      //userId,
      {
        first_name,
        last_name,
        full_name,
        username,
        email,
        user_type,
        status,
        company_name,
        address,
        state,
        city,
        pincode,
        phone
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    res.status(200).json({ code: 200, message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to update User' });
  }
};
//============================================{Upadte- User-Exp} [END]==================================================//

//============================================{Upadte- User} [START]====================================================//
exports.UpdateUser = async (req, res) => {
  const { field, value } = req.body;
  const { userId } = req.params;
 

  if (!field || !value) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let updateField;
  switch (field) {
    case 'first_name':
      updateField = 'first_name';
      break;
    case 'last_name':
      updateField = 'last_name';
      break;
    case 'full_name':
      updateField = 'full_name';
      break;
    case 'username':
      updateField = 'username';
      break;
    case 'email':
      updateField = 'email';
      break;
    case 'user_type':
      updateField = 'user_type';
      break;
    case 'company_name':
      updateField = 'company_name';
      break;
    case 'address':
      updateField = 'address';
      break;
    case 'state':
      updateField = 'state';
      break;
    case 'city':
      updateField = 'city';
      break;
    case 'pincode':
      updateField = 'pincode';
      break;
    case 'phone':
      updateField = 'phone';
      break;
    case 'status':
      updateField = 'status';
      break;
    default:
      //7 segement like 1 @Shekhawat1228
      return res.status(400).json({ error: 'Invalid field' });
  }

  try {
    const updatedUser = await Users.findOneAndUpdate(
     
      { userId: userId },
      { $set: { [updateField]: value } },
      
      { new: true },
      
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
//============================================{Upadte- User} [END]======================================================//

//============================================{User-Delete} [START]=====================================================//
exports.DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findOneAndDelete({ userId: userId});

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }  

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (error) { 
    console.log(error); 
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
//============================================{User-Delete} [END]=======================================================//

//============================================{Get-User} [START]========================================================//
exports.GetUser = async (req, res) => {
try {
  const { userId } = req.params;
  let user = await Users.findOne({ userId: userId})
  if(!user){
    return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Account Not Found",
        data: {},
    });
}

return res.status(200).json({
    statuscode: 200,
    status: "OK",
    message: "User Get Successfull",
    data: {
     
     user
       
    },
});

} catch (error) {
console.error("Failed to Get user", error);
return res.status(500).json({
    statuscode: 500,
    status: "Error",
    message: error.message,
    data: {},
});
}
}
//============================================{Get-User} [END]==========================================================//

//============================================{Get-All-User} [START]====================================================//
exports.getAllUser = async (req, res) => {
 
}
//============================================{Get-All-User} [END]======================================================//
    

// // const hashPassword = async (password) => {
// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     return await bcrypt.hash(password, salt);
// //   } catch (error) {
// //     throw new Error("Hashing failed", error);
// //   }
// // };



// // exports.ResetPassword = async (req, res) => {
// //   try {
// //     const { token, newPassword, confirmPassword } = req.body;

// //     if (!token || !newPassword || !confirmPassword) {
// //       return res.status(400).json({
// //         statuscode: 400,
// //         status: "Not Process",
// //         message: "Please Provide All Mandatory Fields",
// //         data: {}
// //       });
// //     }

//     // Add your SMTP configuration
//     const smtpConfig = {
//       host: 'your-smtp-host',
//       port: 587,
//       secure: false, // Set it to true if using a secure connection (e.g., SSL/TLS)
//       auth: {
//         user: 'rohitshekhawat@starkenn.com',
//         pass: 'Surya@1228'
//       }
//     };

// //     const transporter = nodemailer.createTransport(smtpConfig);

// //     const digits = (token, count = 0) => {
// //       if (token) {
// //         return digits(Math.floor(token / 10), ++count);
// //       };
// //       return count;
// //     };

// //     if (digits(token) != 6) {
// //       return res.status(404).json({
// //         statuscode: 404,
// //         status: "Failed",
// //         message: "Enter 6 Digits of OTP",
// //         data: {},
// //       });
// //     }
// //     const user = await Users.findOne({
// //       resetPasswordToken: token,
// //       resetPasswordExpires: { $gt: Date.now() },
// //     });
// //     if (!user) {
// //       return res.status(402).json({
// //         statuscode: 402,
// //         status: "Failed",
// //         message: "Please Enter Valid Email OTP",
// //         data: {}
// //       });
// //     }

// //     if (newPassword !== confirmPassword) {
// //       return res.status(403).json({
// //         statuscode: 403,
// //         status: "Failed",
// //         message: "Passwords Didn't Match",
// //         data: {}
// //       });
// //     }

// //     const isValid = await Users.comparePasswords(newPassword, user.password);

// //     if (isValid) {
// //       return res.status(401).json({
// //         statuscode: 401,
// //         status: "Failed",
// //         message: "Newly Entered Password Should Not Be Same As Previous Password",
// //         data: {}
// //       });
// //     }

// //     if (!CheckPassword(newPassword)) {
// //       return res.status(405).send({
// //         statuscode: 405,
// //         status: "Failed",
// //         message: "newPassword must be at least 6 characters which include one uppercase, one lowercase, one special character, and one digit",
// //         data: {}
// //       });
// //     }

// //     const hash = await Users.hashPassword(req.body.newPassword);
// //     user.password = hash;
// //     user.resetPasswordToken = null;
// //     user.resetPasswordExpires = "";

// //     await user.save();

// //     // Send the password reset email
// //     const emailOptions = {
// //       from: 'sender-email@example.com',
// //       to: user.email,
// //       subject: 'Password Reset',
// //       text: 'Your password has been successfully reset.'
// //     };

// //     await transporter.sendMail(emailOptions);

// //     return res.status(200).json({
// //       statuscode: 200,
// //       status: "OK",
// //       message: "Password Has Been Reset Successfully",
// //       data: {}
// //     });
// //   } catch (error) {
// //     console.error("reset-password-error", error);
// //     return res.status(500).json({
// //       statuscode: 500,
// //       status: "Error",
// //       message: error.message,
// //       data: {}
// //     });
// //   }
// // };
