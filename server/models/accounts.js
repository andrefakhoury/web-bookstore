const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define schema for /accounts
const accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  admin: {
		type: Boolean,
		required: true,
		default: false
	},
});

const Account = mongoose.model('Account', accountSchema);
module.exports = {Account};