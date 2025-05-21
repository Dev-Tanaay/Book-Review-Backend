const { addReviewService, updateReviewService, deleteReviewService } = require("../services/review.service");

const addReview=async(req,res)=>{
    try {
        const {id} =req.params;
        const { rating, comment } = req.body;
        const userId = req.user.userId;
        const review=await addReviewService(id,rating,comment,userId);
        if (!review) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(201).json({ message: "Review added successfully", review });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateReview=async(req,res)=>{
    const {id} =req.params;
    const { rating, comment } = req.body;
    const review=await updateReviewService(id,rating,comment);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully", review });
}

const deleteReview=async(req,res)=>{
    const {id} =req.params;
    const review=await deleteReviewService(id);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
}
module.exports={addReview,updateReview,deleteReview};