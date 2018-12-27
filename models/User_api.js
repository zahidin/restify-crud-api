const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userapiSchema = new mongoose.Schema({

  nama:{
    type: String,
    required: true,
    trim: true,
  },

  username:{
    type: String,
    required: true,
    trim: true,
  },

  password:{
    type: String,
    required: true,
    trim: true,
  },

  email:{
    type: String,
    required: true,
    trim: true,
  }
});

userapiSchema.plugin(timestamp);
const userApi = mongoose.model('User_Api',userapiSchema);
module.exports = userApi;
