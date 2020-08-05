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
      const avatarExt = avatar.substring( avatar.lastIndexOf('.'), avatar.length);
      
      console.log(user.id)
      if(avatar_type != ''){
        if( !ext.includes ( avatarExt ) ) 
          throw `estenzione ${avatarExt} non consentita `;
          await Gallery.create({ immage : avatar, tipoImage: avatar_type, UserId: user.id });
      }
      
      res.json({msg: 'Correttamente registrato'})
      
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;
    }

  },

  login: async ( req,res ) => {
    const { username, email, pass } = req.body;


    try {
      let user = null;
      if((username && pass) || username != '' && email != '' ) throw 'Inserire Email o Password';

      if( username.length > 0 )
        user = await User.findOne({ where : { username } });
      else
        user = await User.findOne({ where : { email } });

      if(!user) throw 'Nessuna corrispondenza';

      /**controllo la password */

      if( ! await bcrypt.compare(pass, user.pass) ) throw 'password errata'

      const token = jwt.sign( { id: user.id }, secretTokenKey, {expiresIn: '30m', issuer: user.nome} )
      
      res.status(202).json({ token })
      
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;  
    }

  },

  me: async ( req,res ) => {
    try {
      const {id : userId} = JSON.parse(process.user);
      const user = await User.findOne({where : { id : userId}, attributes: ['id','nome','username','email','createdAt'], include:[
        {
          model: Gallery
        }
      ]  })

      
      console.log(user.dataValues)

      res.status(200).json(user.dataValues)
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;  
    }
  },

  edit: async ( req,res ) => {
    const { nome, username, email, pass } = req.body;
    const { id } = req.params;

    try {
      
      const user = await User.findByPk(id);
      
      let newUser = {};
      newUser.nome = nome != undefined ? nome : user.dataValues.nome;
      newUser.username = username != undefined ? username : user.dataValues.username;
      newUser.email = email != undefined ? email : user.dataValues.email;
  
      if(pass != undefined){//conversione della password usando bcrypt
        pass = bcrypt.hashSync(pass, 12);
        newUser.pass = pass;
      }
  
      console.log(newUser)
      await User.update(
        newUser
      ,{
        where: { id: id }
      })

      let desc = await User.describe();
      return res.status(203).json({ desc })
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;
    }
  }
}