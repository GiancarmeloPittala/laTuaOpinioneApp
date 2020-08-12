'use-strict';
const 
  { User, Gallery, Sequelize } = require('../models'),
  { Op}  = Sequelize,
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  { secretTokenKey } = process.env,
  userService = require('../services/user'),
  galleryService = require('../services/gallery')

module.exports = {
  register: async (req,res,next) => {
    const { pass, nome, username, email, avatar, avatar_type } = req.body;
    try {
      
      if( await userService.findByMail(email) )  throw 'email esistente';
      if( await userService.findByUser(username) ) throw 'username esistente';

      const user = await userService.create(req.body);
      await galleryService.create({userId : user.id, avatar, avatar_type})

      res.json({msg: 'Correttamente registrato'})
      
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;
    }

  },

  login: async ( req,res ) => {

    const { email, pass } = req.body;

    try {

      let user = await userService.findByMail(email);
      if(! user ) throw 'Email inesistente';
      if(! await userService.checkPass(pass, user.pass) ) throw 'password errata'
      
      const token = userService.createToken(user);
      
      res.status(202).json({ token })

      
    }catch (error) {
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

      res.status(200).json(user.dataValues)
    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;  
    }
  },

  edit: async ( req,res ) => {
    try {
     await userService.editUser(req.body);
     return res.status(203).json({ msg: 'correttamente modificato' })

    } catch (error) {
      res.status(409).json({error});
      console.error(error)
      return;
    }
  },

  destroy: async ( req,res) => {
    try {
      await userService.delete();
      return res.status(203).json({ msg: 'Utente eliminato' })
 
     } catch (error) {
       res.status(409).json({error});
       console.error(error)
       return;
     }
  },

  getAll: async ( req, res ) => {
    try {
      const users = await userService.findAllUser();
      users.forEach ( u => console.log(u))
      return res.status(203).json({ users })
 
     } catch (error) {
       res.status(409).json({error});
       console.error(error)
       return;
     }
  }
}