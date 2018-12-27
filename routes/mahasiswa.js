const Mahasiswa = require('../models/Mahasiswa');
const errors = require('restify-errors');
const bcrypt = require('bcrypt');
const config = require('../config');

module.exports = server =>{

  // Get mahasiswa
  server.get('/mahasiswa', async (req,res,next)=>{
    try {
        const usrmahasiswa = await Mahasiswa.find({});
        res.send(usrmahasiswa);
        next();
    } catch (e) {
      return next(new errors.InvalidContentError(e));
    }
  });

  server.post('/mahasiswa', (req,res,next) => {
    // check json post
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const {nim,username,nama,email,password,jurusan} = req.body;

    const datapost = new Mahasiswa({
      nim,
      username,
      nama,
      email,
      password,
      jurusan
    });

    // encrypt password
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(datapost.password,salt, async (err,hash) => {
        //hash password
        datapost.password = hash;
        //save mahasiswa

        try{
          const usrmahasiswa = await datapost.save();
          res.status(201);
          res.json({success:true,message:"Success Add Mahasiswa"});
          next();
        }catch(e){
          return next(new errors.InternalError(e.message));
        }

      });
    });
  });

  server.put('/mahasiswa/:id', async (req,res,next)=>{
    // check json
    if(!req.is('application/json')){
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }
    // update mahasiswa
    try {
        const mahasiswa = await Mahasiswa.findOneAndUpdate( { _id : req.params.id} , req.body);
        res.status(200);
        res.json({success:true,message:"Success Update Mahasiswa"});
        next();
    } catch (e) {
        return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  server.del('/mahasiswa/:id', async (req,res,next) => {
    // delete mahasiswa
    try {
      const mahasiswa = await Mahasiswa.findOneAndRemove( { _id:req.params.id });
      res.status(204);
      res.json({success:true,message:"Success Delete Mahasiswa"});
      next();
    } catch (e) {
      return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
    }
  });

  server.del('/mahasiswa/removeall', async (req,res,next) => {
    // delete all data from collcetion
    try{
      const mahasiswa = await Mahasiswa.remove();
      res.status(204);
      res.json({success:true,message:"Success Remove All Data Mahasiswa"});
      next();
    }catch (e){
      return next(new errors.ResourceNotFoundError(`GAGAl DELETE DATA MAHASISWA`));
    }

  });
}
