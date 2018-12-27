const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const mahasiswaSchema = new mongoose.Schema({
  nim: {
    type: Number,
    required: true,
    trim:true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  nama: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  jurusan: {
    type: String,
    required: true,
    trim: true
  },
});

mahasiswaSchema.plugin(timestamp);
const Mahasiswa = mongoose.model('Mahasiswa',mahasiswaSchema);
module.exports = Mahasiswa;
