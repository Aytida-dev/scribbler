const express = require("express");
// const mongoose = require("mongoose");
require("dotenv").config();
const { userModel } = require("../model/userModel");
const userRouter = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './userImg';
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the 'uploads' folder if it doesn't exist
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });


userRouter.get("/", (req, res) => {
  res.send({
    message: "user route",
  });
});

userRouter.post("/signup",upload.single('image') ,async (req, res) => {
  try {
    const {username, password, email, bio} = req.body;
    const newUser = userModel({
      username,
      password,
      email,
      bio,
      image: req.file ? req.file.filename : "",
    });
    await newUser.save();
    res.send({
      message: "user signed up",
    });
  } catch (err) {
    if (err.code === 11000) {
      res.send({
        message: "User already exists",
      });
    } else {
      res.status(404).send({
        message: err.message,
      });
    }
  }
});

userRouter.get("/images/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, "../userImg", filename);
    res.sendFile(imagePath);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      if (req.body.password === user.password) {
        res.send({
          message: "login successful",
          token: token,
          userDetail: user,
        });
      } else {
        res.send({
          message: "incorrect password",
        });
      }
    } else {
      res.send({
        message: "user does not exist",
      });
    }
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
});

userRouter.get("/me", auth, async (req, res) => {
  try {
    res.send({
      message: "user fetched",
      user: req.user,
    });
  }
  catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
})

userRouter.patch("/updateuser", auth,upload.single('image'), async (req, res) => {
  try {
    const {username , email , password , bio } = req.body;
    const update = {
      username,
      email,
      password,
      bio,
      image: req.file ? req.file.filename : "",
    };
    const user = await userModel.findOneAndUpdate({ email: req.user.email }, update, { new: true });
    res.send({
      message: "user updated",
    });
    
  } catch (error) {
    res.status(400).send({
      message: err.message,
    });
  }
})

userRouter.get("/:author", async (req, res) => {
  const email = req.params.author;
  try {
    const user = await userModel.findOne({ email: email });
    res.send({
      message: "user fetched",
      user: user,
    });
  }
  catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
})

module.exports = { userRouter };

// "username":"ai",
//   "password":"123",
//   "email":"raj123",
//   "bio":"hii"
