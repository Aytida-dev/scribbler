const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/userModel");


const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ message: "Token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded && decoded.email) {
      const user = await userModel.findOne({email:decoded.email  });
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(404).send({ message: "User not found" });
      }
    } else {
      return res.status(401).send({ message: "Invalid token" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { auth };
