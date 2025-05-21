const { addBookService, getBookService, searchService, getBookDetailService } = require("../services/book.service");

const addBook = async (req, res) => {
    try {
        const { title, author, coverImages, genre, description, publishedDate } = req.body;
        if (!title || !author) {
            return res.status(400).json({ message: "Title and Author are required" });
        }
        const userId = req.user.userId;
        const book = await addBookService(title, author, coverImages, genre, description, publishedDate, userId);
        if (!book) {
            return res.status(400).json({ message: "Book not saved" });
        }
        return res.status(201).json({ message: "Book added successfully",book});
    } catch (error) {
        console.error("Error in addBook:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

const getBook = async (req, res) => {
    try {
        const { page = 1, limit = 10, author, genre } = req.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            return res.status(400).json({ message: "Invalid pagination parameters" });
        }
        const { books } = await getBookService(pageNumber, limitNumber, author, genre);
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (error) {
        console.error("Error in getBook:", error);
        res.status(500).json({ message: error.message || "Internal server error" });
    }
};

const getBookDetail = async (req, res) => {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
        return res.status(400).json({ message: "Invalid pagination parameters" });
    }
    const userId = req.user.userId;
    const {book, reviews, averageRating, totalReviews} = await getBookDetailService(pageNumber, limitNumber, id, userId);
    res.status(200).json({ message: "Book fetched successfully", book, reviews, averageRating, totalReviews });
}

const search = async (req, res) => {
    const author = req.query.author || "";
    const title = req.query.title || "";
    const books = await searchService(author, title);
    if (!books || books.length === 0) {
        return res.status(404).json({ message: "No books found" });
    }
    res.status(200).json({ message: "Books fetched successfully", books });
}
module.exports = { addBook, getBook, getBookDetail, search };