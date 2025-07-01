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

  // Assuming your JWT middleware already set req.user.username
  const username = req.user.username;

  if (!review) {
    return res.status(400).json({ message: "Review content is required as a query parameter." });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  // If no reviews object exists, create one
  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  // Add or update the review for this user
  books[isbn].reviews[username] = review;

  return res.status(200).json({ message: "Review added/modified successfully." });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
