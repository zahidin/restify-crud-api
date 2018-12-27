const auth = require('../auth');
const bcrypt = require('bcrypt');
const error = require('restify-errors');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User_Api = require('../models/User_api');

module.exports = server => {

  server.post('/login', async (req,res,next) => {
    if(!req.is('application/json')){
      return next(new error.InvalidContentError("Expects: 'application/json'"));
    }
    const {username,password} = req.body;
    try{
      // authenticate user
      const verifuser = await auth.authenticate(username,password);
      // create jwt
      const token = jwt.sign(verifuser.toJSON(),config.JWT_KEY,{
        expiresIn:'24h',
      });

      res.json({success:true,token_user:token});
      next();
    }catch(e){
      return next(new error.UnauthorizedError(e));
    }

  });
}
