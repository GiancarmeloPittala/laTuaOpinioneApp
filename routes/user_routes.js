const 
  express = require('express'),
  { body, check} = require('express-validator'),
  router = express.Router({caseSensitive : true}),
  erorrHandler = require('../middlewares/erorrCheck'),
  { register, login } = require('../controllers/user_controllers'),
  { User } = require('../models') 


router 
  .post('/login', (req,res) => {

    body('email').trim(),
    body('username').trim(),
    body('pass').trim().not.isEmpty().isLength({ min: 5 })

  },erorrHandler,login)
  .post('/register',[

    body('nome').trim(),
    body('email').trim().isEmail().custom( async email => {
      try {
        const user = await User.findAll({where : {email} })

        if(user.length == 1)
          throw new Error('email esistente');
      } catch (error) {
        throw new Error(error);
      }
    }),
    body('username').trim().not().isEmpty().withMessage('Campo obbligatorio').custom( async username => {
      try {
        const user = await User.findAll({where : {username} })

        if(user.length == 1)
          throw new Error('username esistente');
      } catch (error) {
        throw new Error(error);
      }
    }),
    body('pass').trim().isLength({ min: 5 })

  ],erorrHandler, register ) 

  

  
  

  module.exports = router 