const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();


// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//Database
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology:true}, 
  () => {console.log(`Connected to MongoDB: ${MONGO_URI}`)});



// ROUTES
app.get('/', (req, res) => {
  res.send('Welcome to an Awesome App about Breads!');
});

// breads
const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// bakers 
const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)



// 404 Page
app.get('*', (req, res) => {
  res.send('404')
})


// LISTEN
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`);
});