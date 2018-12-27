const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User_Api = mongoose.model('User_Api');

// module.exports dan exports sama saja
// module.exports  = fungsi() => {}
// exports.fungsi() = {}

exports.authenticate = (username,password) => {
  return new Promise( async (resolve, reject) => {
    try{
      const user = await User_Api.findOne({username:username});
      bcrypt.compare(password,user.password,(err,ismatch) => {
        if(err) throw err;
        if(ismatch){
          resolve(user);
        }else{
          reject('Authenticate Failed');
        }
      });
    }catch(e){
      reject('Authenticate Failed');
    }
  });
}
