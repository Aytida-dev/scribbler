const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connect(process.env.MONGO_URL);

module.exports = { db };
