const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const app = express()

// Mongoose setup //////////////

// connect to database books
const db = mongoose.connect('mongodb://db/books', { useNewUrlParser: true } )

// create schema for your data
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    views: { type: Number, default: 0 }
  }, 
  {
    timestamps: true
  }
)

// associate schema with mongodb database
const Book = mongoose.model('Book', bookSchema)

// Mongoose setup //////////////

app.use(bodyParser.json())

app.post('/books', (req, res, next) => {
  // TODO: add create code here 
  const { title, author } = req.body

  Book.create({ title, author }, (err, book) => {
    if(err) return res.status(500).send(err)
    res.send(book)
  })
})

app.get('/books', (req, res, next) => {
  // TODO: add get all code here
  Book.find({}, function(err, books){
    if(err) return res.status(500).send(err)
    res.send(books)
  })
})

app.get('/books/:bookId', (req, res, next) => {
  // TODO: add get ont code here
  Book.findById(req.params.bookId, (err, book) => {
    if(err) return res.status(500).send(err)
    res.send(book)
  })
})

app.delete('/books/:id', (req, res, next) => {
  // TODO: add delete one code here 
  Book.deleteOne({ _id: req.params.id}, (err, book) => {
    if(err) return res.status(500).send(err)
    res.send(book)
  })
})

app.patch('/books/:id', (req, res, next) => {
  // TODO: add update one code here 
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})