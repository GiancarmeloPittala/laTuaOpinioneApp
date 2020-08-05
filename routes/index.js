const 
  user = require('./user_routes')

module.exports = (app) => {

  app.use('/api/user/', user);

  app.get('/', (req,res) => {
    res.render('index.ejs')
  })
  app.get('/registrazione', (req,res) => {
    res.render('registrazione.ejs')
  })


  app.get('*', (req,res) => {
    res.status(500).json({msg: 'rotta non trovata' })
  })

};