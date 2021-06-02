const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
 

});

const RegisSchema = new mongoose.model("Users", Schema);
module.exports = RegisSchema;