// the routes which a general user can access

const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Helper function to check if user exists
const doesExist = (username) => {
  return users.filter((user) => user.username === username).length > 0;
};

public_users.post("/register", (req,res) => {
    const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(409).json({ message: "User already exists!" });
    }
  }

  return res.status(400).json({ message: "Unable to register user. Username and password are required." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isb = req.params.isbn;
  const book = books[isb];
  if (book){
    res.send(book);
  } else{
    res.status(404).send({ message: "Book not found" });
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const matchingBooks = [];

  for (let isbn in books) {
    if (books[isbn].author === author) {
      matchingBooks.push({ isbn: isbn, ...books[isbn] });
    }
  }

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
    res.status(404).send({ message: "No books found for this author" });
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const matchingBooks = [];

  for (let isbn in books) {
    if (books[isbn].title === title) {
      matchingBooks.push({ isbn: isbn, ...books[isbn] });
    }
  }

  if (matchingBooks.length > 0) {
    res.send(matchingBooks);
  } else {
    res.status(404).send({ message: "No books found for this title" });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    res.send(book.reviews);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

module.exports.general = public_users;
