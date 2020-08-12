
const Joi = require('@hapi/joi');


module.exports = {
  loginValidator : {
    body : {
      email: Joi.string().normalize().trim().email().required()
      , pass: Joi.string().normalize().trim().required().min(4).required()
    }
  },
  registerValidator: {
    body:{
      nome: Joi.string().normalize()
      , email: Joi.string().normalize().trim().email().required()
      , username: Joi.string().normalize()
      , pass: Joi.string().normalize().trim().required().min(4)
      , avatar: Joi.string().normalize().trim()
      , avatar_type: Joi.string().normalize().trim() 
    }
  },
  editValidator: {
    body:{
      nome: Joi.string().normalize()
      , email: Joi.string().normalize().trim().email()
      , username: Joi.string().normalize()
      , pass: Joi.string().normalize().trim().min(4)
      , avatar: Joi.string().normalize().trim()
      , avatar_type: Joi.string().normalize().trim() 
    }
  }

}