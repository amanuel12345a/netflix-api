const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  likedMovies: [
    {
      genres : {type: Array},
      id: {type: Number},
      image:{type: String},
      name:{type: String}
    }
  ],
});
module.exports = mongoose.model("users", userSchema);