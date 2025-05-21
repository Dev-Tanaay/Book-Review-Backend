const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { addBook, getBook, search, getBookDetail } = require("../controllers/book.controller");
const { addReview } = require("../controllers/review.controller");

router.post("/books", authMiddleware,addBook);
router.get("/books", authMiddleware,getBook);
router.get("/books/:id", authMiddleware,getBookDetail);
router.post("/books/:id/reviews", authMiddleware,addReview);

router.get("/search",search);


module.exports = router;
