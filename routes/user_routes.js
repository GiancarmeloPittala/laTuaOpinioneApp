const 
  express = require('express'),
  validate = require('express-joi-validate'),
  router = express.Router({caseSensitive : true}),
  { register, login, me, edit } = require('../controllers/user_controllers'),
  { User } = require('../models'),
  isAuth = require('../middlewares/isAuth'),
  { loginValidator, registerValidator } = require('./validators/user');

router 
  .post('/login', validate( loginValidator ), login)

  .post('/register',validate( registerValidator ), register ) 

  .get('/me', isAuth ,me)
  
  .put('/:id',isAuth, edit)
  
  

  module.exports = router 