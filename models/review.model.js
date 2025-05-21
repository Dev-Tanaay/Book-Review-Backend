const mongoose=require('mongoose');
const reviewModel=mongoose.Schema({
    bookId:{
        type:mongoose.Types.ObjectId,
        ref:"Book"
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    comment:{
        type:String,
        trim:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
});
const Review=mongoose.model("Review",reviewModel);
module.exports=Review;