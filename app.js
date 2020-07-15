const 
  express = require('express'),
  app = express(),
  cors = require('cors'),
  { parsed : { PORT } } = require('dotenv').config(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  { sequelize } = require('./models'),
  helmet = require('helmet'),
  multer = require('multer');


  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })


app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(multer({storage}).single('image'));
require('./routes')(app);


  
  app.listen(PORT, async () => {
    try {

      await sequelize.authenticate()
      await sequelize.sync({alter: false, force: false})

    } catch (error) {
      console.error(error);
      return;
    }
    console.log(`In ascolto su http://localhost:${PORT}`)
    console.log('Database correttamente generato ')
  })


