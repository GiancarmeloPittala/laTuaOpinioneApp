const 
  JWT = require('jsonwebtoken'),
  { secretTokenKey } = process.env;

module.exports = async (req,res,next) => {
  try {
    const token = req.headers.authorization;
    if(!token) throw 'Non possiedi le credenziali';

    const jwt = token.split(" ")[1];

    console.log(jwt)
    const jwt_verificato = JWT.verify(jwt,secretTokenKey);

    process.user = JSON.stringify({id : jwt_verificato.id })
    next();
  } catch (error) {
    
    console.error(error);
    res.status(500).json({error})
    return;
  }

}