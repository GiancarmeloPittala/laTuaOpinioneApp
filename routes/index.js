const 
  user = require('./user_routes')

module.exports = (app) => {

  app.use('/api/user/', user);
  app.use('/', (req,res) => {
    res.render('index.ejs')
  })

  app.get('*', (req,res) => {
    res.status(500).json({msg: 'rotta non trovata' })
  })

};