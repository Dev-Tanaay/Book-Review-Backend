const Review = require("../models/review.model");

const addReviewService=async(id,rating,comment,userId)=>{
    try {
        const existingReview=await Review.findOne({ bookId: id, userId });
        if (existingReview) {
            throw new Error("Review already exists");
        } 
        const newReview =await new Review({ bookId: id, userId, rating, comment });
        const saveReview= await newReview.save();
        if (!saveReview) {
            throw new Error("Failed to add review");
        }
        return saveReview;
        
    } catch (error) {
        console.error("Error adding review:", error);
        throw new Error("Internal server error");
        
    }
}

const updateReviewService=async(id,rating,comment)=>{
    try {
        const review = await Review.findOne({_id: id});
        if (!review) {
            throw new Error("Review not found");
        }
        const updatedReview = await Review.findByIdAndUpdate(
            review._id,
            { rating, comment },
            { new: true }
        );
        if (!updatedReview) {
            throw new Error("Failed to update review");
        }
        return updatedReview;
    } catch (error) {
        console.error("Error updating review:", error);
        throw new Error("Internal server error");
        
    }
}

const deleteReviewService=async(id)=>{
    try {
        const review = await Review.findById({_id: id});
        if (!review) {
            throw new Error("Review not found");
        }
        const deleteReview=await Review.findByIdAndDelete({_id:id});
        if (!deleteReview) {
            throw new Error("Failed to delete review");
        }
        return deleteReview;
    } catch (error) {
        console.error("Error deleting review:", error);
        throw new Error("Internal server error");
    }
}
module.exports={addReviewService,updateReviewService,deleteReviewService};