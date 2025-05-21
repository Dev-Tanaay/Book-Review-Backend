const mongoose=require("mongoose")
const Book = require("../models/book.model");
const Review = require("../models/review.model");

const addBookService = async (title, author, coverImages, genre, description, publishedDate, userID) => {
    try {
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            throw new Error("Book already exists");
        }
        const book = new Book({title,author,coverImages,genre,description,publishedDate,createdBy:userID});
        const savedBook = await book.save();
        return savedBook;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Duplicate key error: Book title or author already exists");
        }
        throw error;
    }
};

const getBookService = async (page, limit, author, genre) => {
    try {
        const skip = (page - 1) * limit;
        const filter = {};
        if (author && typeof author === "string") {
            filter.author = author;
        }
        if (genre && typeof genre === "string") {
            filter.genre = genre;
        }

        const books = await Book.find(filter, { "__v": 0 })
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "username -_id");
        return { books };
    } catch (error) {
        console.error("Error in getBookService:", error);
        throw new Error("Error fetching books");
    }
};

const getBookDetailService = async (page, limit, id, userId) => {
    try {
        const skip = (page - 1) * limit;
        const book = await Book.findById(id,{"_id":0,"__v":0}).populate("createdBy", "username -_id");
        if (!book) {
            throw new Error("Book not found");
        }
        const reviews = await Review.find({bookId:id},{"_id":0,"bookId":0,"__v":0})
            .skip(skip)
            .limit(limit)
            .populate("userId", "username -_id");

        const avgResult = await Review.aggregate([
            { $match: { bookId: new mongoose.Types.ObjectId(id) } },
            {
                $group: {
                    _id: "$bookId",
                    averageRating: { $avg: "$rating" },
                    totalReviews: { $sum: 1 }
                }
            }
        ]);
        let averageRating = 0;
        let totalReviews = 0;
        if (avgResult.length > 0) {
            averageRating = avgResult[0].averageRating.toFixed(1);
            totalReviews = avgResult[0].totalReviews;
        }
        return { book, reviews, averageRating, totalReviews };
    } catch (error) {
        console.error("Error in getBookDetailService:", error);
        throw new Error("Error fetching book details");
    }
};

const searchService = async (authorKeyword, titleKeyword) => {
    try {
        const filter = {};
        if (authorKeyword) {
            filter.author = { $regex: authorKeyword, $options: "i" };
        }
        if (titleKeyword) {
            filter.title = { $regex: titleKeyword, $options: "i" };
        }
        const books = await Book.find(filter).populate("createdBy", "username -_id");
        return books;
    } catch (error) {
        console.error("Error in searchService:", error);
        throw new Error("Error searching books");
    }
};

module.exports = { addBookService, getBookService, getBookDetailService, searchService };