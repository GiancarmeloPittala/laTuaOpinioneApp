
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
  findByPk : id => User.findByPk(id),
  findByUser : username => User.findOne({where: { username }}),
  checkPass : (pass, databasePass ) => bcrypt.compare(pass,databasePass),
  createToken : (user) => jwt.sign( {id: user.id},  secretTokenKey, {expiresIn: '30m', issuer: user.nome} ),
  findAllUser: () => User.findAll({attributes: ["nome","username","email","createdAt","updatedAt"]}),
  editUser : async user => { 
    const idUser = JSON.parse(process.user).id;
    const datiUtente = await User.findByPk(idUser);

    if(!datiUtente) throw 'utente inesistente';

    let { nome, username, email, pass } = user;
    let newUser = {};
    
    newUser.nome = nome != undefined ? nome : datiUtente.dataValues.nome;
    newUser.username = username != undefined ? username : datiUtente.dataValues.username;
    newUser.email = email != undefined ? email : datiUtente.dataValues.email;
    newUser.pass = pass != undefined ? bcrypt.hashSync(pass, 12) : datiUtente.dataValues.pass;
    
    return User.update(
      newUser
    ,{
      where: { id: idUser }
    }) 

  },
  delete: () => User.destroy({where: { id : JSON.parse(process.user).id }})
}  
