

# 📚 Express Book Review Application

This is a simple Node.js Express project for managing a book review application.
It allows users to browse books, register, log in, post reviews, and manage their own reviews.

---

## 🏗️ Project Structure

```
final_project/
├── router/
│   ├── auth_users.js       # Routes for registered/authenticated users (login, add/delete review)
│   ├── booksdb.js          # Book data (ISBN, title, author, reviews)
│   └── general.js          # Routes for public users (view books, search by author, title, etc.)
├── index.js                # Main server setup
├── package.json            # Project dependencies and scripts
├── README.md               # Project description (this file)
└── ...
```

---

## 🚀 Features

* ✅ View all books
* ✅ Get book details by ISBN, author, or title
* ✅ User registration
* ✅ User login with JWT session handling
* ✅ Add or modify a book review
* ✅ Delete your own review
* ✅ Use of Promises and Async/Await with Axios (Tasks 10-13)

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* express-session
* jsonwebtoken (JWT)
* Axios (for tasks using async/await or promise callbacks)

---

## ✅ Running the Project Locally

1. Clone the repository:

```bash
git clone https://github.com/Helia-Karisani/express-BookReviewApplication.git
```

2. Navigate to the project folder:

```bash
cd express-BookReviewApplication/final_project
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

---

## ✅ API Endpoints

| **Endpoint**                  | **Method** | **Description**                 |
| ----------------------------- | ---------- | ------------------------------- |
| `/`                           | GET        | Get all books                   |
| `/isbn/:isbn`                 | GET        | Get book by ISBN                |
| `/author/:author`             | GET        | Get books by author             |
| `/title/:title`               | GET        | Get books by title              |
| `/register`                   | POST       | Register new user               |
| `/customer/login`             | POST       | Login user                      |
| `/customer/auth/review/:isbn` | PUT        | Add or modify review (customer) |
| `/customer/auth/review/:isbn` | DELETE     | Delete review (customer)        |

*(More endpoints for Promises/Async await are implemented in `general.js` for tasks 10-13.)*

---

## ✅ Notes

This project was created as part of the Express Backend Development Practice for Book Review Applications.
