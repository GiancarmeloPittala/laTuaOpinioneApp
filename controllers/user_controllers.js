'use-strict';
const 
  { User, Gallery, Sequelize } = require('../models'),
  { Op}  = Sequelize,
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  { secretTokenKey } = process.env;

module.exports = {
  register: async (req,res,next) => {
    const { pass, nome, username, email, avatar, avatar_type } = req.body;
    
    try {
      const hashPass = await bcrypt.hash(pass,12);
      
      const user = await User.create({
        nome,
        username,
        email,
        pass : hashPass
      })

      const ext = ['.gif'];
      const avatarExt = avatar.substring( avatar.lastIndexOf('.'),avatar.length);
      
      console.log(user.id)
      if(avatar_type != ''){
        if( !ext.includes ( avatarExt ) ) 
          throw `estenzione ${avatarExt} non consentita `;
          await Gallery.create({ immage : avatar, tipoImage: avatar_type, UserId: user.id });
      }
      

    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;
    }

    res.json({msg: '99'})
  },

  login: async ( req,res ) => {
    const { username, email, pass } = req.body;

    
    try {
      let user = null;
      if(username != '' && email != '' ) throw 'Inserire Email o Pass';

      if(username.length > 0 )
        user = await User.findOne({ where : { username } });
      else
        user = await User.findOne({ where : { email } });

      if(!user) throw 'Nessuna corrispondenza';

      const token = jwt.sign( { id: user.id }, secretTokenKey )
      
      res.json({ token })
      
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;  
    }

  },

  me: async ( req,res ) => {
    res.json({msg: 's'})
  }
}