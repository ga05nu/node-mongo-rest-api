const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Person = require('./models/person');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/personAPI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes

// GET /person - Display all people
app.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    res.render('index', { people });
  } catch (err) {
    res.status(500).send('Error fetching people data');
    console.error(err);
  }
});

// GET /person/new - Display form to create a person
app.get('/person/new', (req, res) => {
  res.render('create');
});

// POST /person - Create a new person
app.post('/person', async (req, res) => {
  try {
    const person = new Person({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile
    });
    
    await person.save();
    res.redirect('/person');
  } catch (err) {
    res.status(400).send('Error saving person data');
    console.error(err);
  }
});

// GET /person/:id/edit - Display form to edit a person
app.get('/person/:id/edit', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send('Person not found');
    res.render('edit', { person });
  } catch (err) {
    res.status(500).send('Error fetching person data');
    console.error(err);
  }
});

// PUT /person/:id - Update a person
app.post('/person/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.mobile
    }, { new: true });
    
    if (!person) return res.status(404).send('Person not found');
    res.redirect('/person');
  } catch (err) {
    res.status(400).send('Error updating person data');
    console.error(err);
  }
});

// GET /person/:id/delete - Display page to confirm deletion
app.get('/person/:id/delete', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) return res.status(404).send('Person not found');
    res.render('delete', { person });
  } catch (err) {
    res.status(500).send('Error fetching person data');
    console.error(err);
  }
});

// DELETE /person/:id - Delete a person
app.post('/person/:id/delete', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) return res.status(404).send('Person not found');
    res.redirect('/person');
  } catch (err) {
    res.status(400).send('Error deleting person data');
    console.error(err);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
