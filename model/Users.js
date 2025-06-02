const { default: mongoose } = require("mongoose");

const Userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// const Kitten = mongoose.model('collection name', variable name);
module.exports = mongoose.model('Users', Userschema);