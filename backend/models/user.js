const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
//userSchema.plugin(uniqueValidator);

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User',userSchema);
