const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');
const rjwt = require('restify-jwt-community');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer();	

const cors = corsMiddleware({
    'origins': ['*']
});
server.pre(cors.preflight);
server.use(cors.actual);

server.use(rjwt({ secret: config.JWT_KEY}).unless({path: ['/auth','/login']}));
server.use(restify.plugins.bodyParser());

server.listen(config.PORT,() =>{
  mongoose.set('useFindAndModify',false);
  mongoose.connect(config.DBURL,{ useNewUrlParser: true });
});

const db = mongoose.connection;

db.on('error',(err)=>{
  console.log(err);
});

db.once('open',()=>{
  require('./routes/mahasiswa')(server);
  require('./routes/userapi')(server);
  require('./routes/login')(server);
  console.log(`Server Listen Port In ${config.PORT}`);
});
