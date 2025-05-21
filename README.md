# **Book Review API**

A RESTful API for managing books, reviews, and user authentication. This project is built using **Node.js**, **Express**, and **MongoDB**. It supports features like user authentication, book management, review management, and search functionality.

---

## **Features**
- **User Authentication**:
  - Signup and login with JWT-based authentication.
- **Book Management**:
  - Add, fetch, and search books.
  - Fetch book details with reviews and ratings.
- **Review Management**:
  - Add, update, and delete reviews for books.
- **Search**:
  - Search books by title or author (case-insensitive and partial matching).

---

## **Project Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/Dev-Tanaay/Book-Review-Backend.git
cd Book-Review-Backend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the `backend` directory and add the following:
```
MONGO_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
```

Replace `_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB URI and JWT secret.

### **4. Start the Server**
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

---

## **How to Run Locally**

1. Ensure MongoDB is running locally or use a cloud MongoDB service (e.g., MongoDB Atlas).
2. Start the server using `npm run dev`.
3. Use tools like **Postman** or **curl** to test the API endpoints.

---

## **Example API Requests**

### **1. User Authentication**
#### **Signup**
```bash
curl -X POST http://localhost:3000/signup \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}'
```

#### **Login**
```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "testuser@example.com",
  "password": "password123"
}'
```

---

### **2. Book Management**
#### **Add a Book**
```bash
curl -X POST http://localhost:3000/books \
-H "authorization: <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Thunderclap",
  "author": "James Patterson, Michael Ledwidge",
  "genre": "Thriller",
  "description": "A gripping thriller...",
  "publishedDate": 2012,
  "coverImages": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}'
```

#### **Get All Books**
```bash
curl -X GET "http://localhost:3000/books?page=1&limit=10" \
-H "authorization:  <your_jwt_token>"
```

#### **Get Book Details**
```bash
curl -X GET "http://localhost:3000/books/<book_id>?page=1&limit=5" \
-H "authorization:  <your_jwt_token>"
```

#### **Search Books**
```bash
curl -X GET "http://localhost:3000/search?title=Thunderclap&author=James" \
-H "authorization:  <your_jwt_token>"
```

---

### **3. Review Management**
#### **Add a Review**
```bash
curl -X POST http://localhost:3000/books/<book_id>/reviews \
-H "authorization:  <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{
  "rating": 5,
  "comment": "Amazing book!"
}'
```

#### **Update a Review**
```bash
curl -X PUT http://localhost:3000/reviews/<review_id> \
-H "authorization:  <your_jwt_token>" \
-H "Content-Type: application/json" \
-d '{
  "rating": 4,
  "comment": "Updated review comment"
}'
```

#### **Delete a Review**
```bash
curl -X DELETE http://localhost:3000/reviews/<review_id> \
-H "authorization:  <your_jwt_token>"
```

---

## **Design Decisions and Assumptions**
1. **Authentication**:
   - JWT is used for stateless authentication.
   - Tokens expire after 5 days.
2. **Database**:
   - MongoDB is used as the database.
   - Mongoose is used for schema modeling.
3. **Error Handling**:
   - Centralized error handling middleware is used.
4. **Pagination**:
   - Pagination is implemented for fetching books and reviews.
   - Default `page` is 1 and `limit` is 10.
5. **Search**:
   - Case-insensitive and partial matching is implemented using MongoDB's `$regex`.

---

## **Database Schema**

### **1. User**
| Field     | Type     | Description              |
|-----------|----------|--------------------------|
| `username`| String   | User's name              |
| `email`   | String   | User's email (unique)    |
| `password`| String   | Hashed password          |

### **2. Book**
| Field          | Type               | Description                     |
|-----------------|--------------------|---------------------------------|
| `title`        | String             | Book title (unique)            |
| `author`       | String             | Book author (unique)           |
| `coverImages`  | Array of Strings   | URLs of book cover images      |
| `genre`        | String             | Book genre                     |
| `description`  | String             | Book description               |
| `publishedDate`| Number             | Year of publication            |
| `createdBy`    | ObjectId           | Reference to the user who added the book |

### **3. Review**
| Field     | Type       | Description                     |
|-----------|------------|---------------------------------|
| `bookId`  | ObjectId   | Reference to the book           |
| `userId`  | ObjectId   | Reference to the user who reviewed |
| `comment` | String     | Review comment                 |
| `rating`  | Number     | Rating (1-5)                   |

