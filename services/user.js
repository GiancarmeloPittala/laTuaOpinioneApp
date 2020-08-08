
const 
  { User } = require('../models/index')
  , bcrypt = require('bcryptjs')
  , jwt = require('jsonwebtoken')
  , { secretTokenKey } = process.env

module.exports  = {

  create: ({ pass, nome, username, email, avatar, avatar_type }) => {
    const hashPass = bcrypt.hashSync(pass,12);
    return User.create({
        nome,
        username,
        email,
        pass : hashPass,
        avatar,
        avatar_type
      })
    
  },

  findByMail : email => User.findOne({where: { email }}),
  findByUser : username => User.findOne({where: { username }}),
  checkPass : (pass, databasePass ) => bcrypt.compare(pass,databasePass),
  createToken : (user) => jwt.sign( {id: user.id},  secretTokenKey, {expiresIn: '30m', issuer: user.nome} )

}  
