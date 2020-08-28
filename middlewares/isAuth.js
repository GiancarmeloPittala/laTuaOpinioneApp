const 
  JWT = require('jsonwebtoken'),
  { secretTokenKey } = process.env,
  {redis, getAsync} = require('../redis');

module.exports = async (req,res,next) => {
  try {
    const token = req.headers.authorization;
    if(!token) throw 'Non possiedi le credenziali';

    const jwt = token.split(" ")[1];

    const jwt_verificato = JWT.verify(jwt,secretTokenKey);

    
    // redis.get(jwt, ( err, reply ) => {

    //   console.log("bhi")
    //   if (err) throw err

    //   console.log(reply)
    //   if (!reply) new Error('Token inesistente, si prega di effettuare una login')
    // });
    
    const checkJwt = await getAsync(jwt_verificato.email);
    if(!checkJwt) throw 'Token non presente, si prega di effettuare una login'

    process.user = JSON.stringify({id : jwt_verificato.id })
    next();
    
 

  } catch (error) {
    
    console.error(error);
    res.status(500).json({error})
    return;
  }

}