const 
  express = require('express'),
  { body, check, param } = require('express-validator'),
  router = express.Router({caseSensitive : true}),
  erorrHandler = require('../middlewares/erorrCheck'),
  { register, login, me, edit } = require('../controllers/user_controllers'),
  { User } = require('../models'),
  isAuth = require('../middlewares/isAuth') 


router 
  .post('/login',[ 

    body('email').trim(),
    body('username').trim(),
    body('pass').trim().not().isEmpty().isLength({ min: 5 })

  ],erorrHandler,login)

  .post('/register',[

    body('avatar').trim(),
    body('avatar_type').trim().isIn(['url','base64','']).withMessage('tipo immagine consentito url o base64 '),
    body('nome').trim(),
    check('email').trim().isEmail().custom( async email => {
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

  .get('/me', isAuth ,me)
  
  .put('/:id',isAuth ,[
    param('id').custom( async id => {
      console.log(await User.findByPk(id));
      if( ! await User.findByPk(id) ) throw new Error(' Id utente non esiste ')
    })
  ],erorrHandler, edit)
  
  

  module.exports = router 