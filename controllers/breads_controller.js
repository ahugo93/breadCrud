const express = require('express');
const breads = express.Router();
const Bread = require('../models/breads.js');
const Baker = require('../models/baker.js')
const seedValues = require('../database/seed');


// INDEX
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find()
  const foundBreads = await Bread.find() 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})




//SEED
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedValues)
    .then(seededBreads => {
      res.redirect('/breads')
    })
})

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
      .then(foundBakers => {
          res.render('new', {
              bakers: foundBakers
          })
    }) .catch(err => console.log(err));
})



// SHOW
breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean() 
  const foundBreads = await Bread.find().limit(2).lean() 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})



// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = undefined;  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = 'true';
  } else {
    req.body.hasGluten = 'false';
  }
  Bread.create(req.body);
  res.redirect('/breads');
});

// EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
        Bread.findById(req.params.id)
          .then(foundBread => {
            res.render('edit', {
                bread: foundBread, 
                bakers: foundBakers 
            })
          })
    })
})



// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
    .then(updatedBread => {
      console.log(updatedBread) 
      res.redirect(`/breads/${req.params.id}`) 
    })
})


// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id) 
    .then(deletedBread => { 
      res.status(303).redirect('/breads')
    })
})



module.exports = breads;







