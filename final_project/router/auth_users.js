//  implementations for the routes which an authorized user can access
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.filter((user) => user.username === username).length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
//check if username and password match the one we have in records.
return users.filter((user) => user.username === username && user.password === password).length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (authenticatedUser(username, password)) {
    // Generate JWT
    let accessToken = jwt.sign(
      { username: username },
      "access", // Secret key
      { expiresIn: "1h" }
    );

    // Save JWT token in session
    req.session.authorization = {
      accessToken: accessToken
    };

    return res.status(200).json({ message: "User successfully logged in." });
  } else {
    return res.status(401).json({ message: "Invalid username or password." });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({ message: "Review content is required as a query parameter." });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  // ✅ Correct: Make sure reviews is an object
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;  // ✅ Correct way to store per-user reviews

  return res.status(200).json({ message: "Review added/modified successfully." });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;  // Username from session / JWT

  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  // Check if the user has a review for this book
  if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Your review deleted successfully." });
  } else {
    return res.status(404).json({ message: "You have no review for this book to delete." });
  }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
