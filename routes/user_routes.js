const 
  express = require('express'),
  validate = require('express-joi-validate'),
  router = express.Router({caseSensitive : true}),
  { register, login, me, edit, destroy, getAll } = require('../controllers/user_controllers'),
  { User } = require('../models'),
  isAuth = require('../middlewares/isAuth'),
  { loginValidator, registerValidator, editValidator } = require('./validators/user');

router 
  .post('/login', validate( loginValidator ), login)

  .post('/register',validate( registerValidator ), register ) 
  
  .get('/me', isAuth ,me)
  
  .get('/all', getAll )
  
  .put('/me',validate( editValidator ), isAuth, edit)
  
  .delete('/me',isAuth, destroy)

  module.exports = router 