const 
  express = require('express'),
  app = express(),
  cors = require('cors'),
  { parsed : { PORT, NODE_ENV } } = require('dotenv').config(),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  { sequelize } = require('./models'),
  helmet = require('helmet'),
  fs = require('fs'),
  path = require('path');


app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined',{ stream : fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));
app.set('view engine', 'ejs');
app.use(express.static('public'))
require('./routes')(app);
  
console.log(process.env.PORT)
  app.listen(process.env.PORT, async () => {
    try {

      await sequelize.authenticate()
      await sequelize.sync({alter: false, force: false})

      console.log(`In ascolto su http://localhost:${PORT}\nDatabase correttamente generato ... -> ${NODE_ENV} `)

    } catch (error) {
      console.error(error);
      return;
    }
  })


