'use-strict';
const 
  { User } = require('../models'),
  bcrypt = require('bcryptjs')

module.exports = {
  register: async (req,res,next) => {
    const { pass, nome, username, email } = req.body;

    try {
      const hashPass = await bcrypt.hash(pass,12);
      
      User.create({
        nome,
        username,
        email,
        pass : hashPass
      })

    } catch (error) {
      next(error)
    }

    res.json({msg: '99'})
  },
  login: async ( req,res ) => {

  } 
}