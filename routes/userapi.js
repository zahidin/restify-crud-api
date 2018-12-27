const User_Api = require('../models/User_api');
const error = require('restify-errors');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = server =>{
  // get data user api
  server.get('/userapi',async (req,res,next) =>{
    try{
      const userapi = await User_Api.find({});
      res.send(userapi);
      next();
    }catch(e){
      return next(new error.InvalidContentError(e));
    }
  });

  server.post('/userapi', (req,res,next) => {
    if(!req.is('application/json')){
      return next(new error.InvalidContentError("Expects 'application/json'"));
    }

    const {username,email,nama,password} = req.body
    const datapost = new User_Api({
      username,
      email,
      nama,
      password,
    });

    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(datapost.password,salt, async (err,hash)=>{

        datapost.password = hash;

        try{
          const userapi = await datapost.save()
          res.status(201);
          res.json({success:true,message:"Success Save Data User API"});
        }catch(e){
          return next(new error.InternalError(e.message));
        }
      });
    });

  });

  server.del('/userapi/removeall', async (req,res,next) => {
    try{
      const userapi = await User_Api.deleteMany();
      res.json({ success:true , message:"Success Remove All"});
      next();
    }catch(e){
      return next( new error.ResourceNotFoundError(`GAGAL REMOVE ALL`));
    }
  });
}
