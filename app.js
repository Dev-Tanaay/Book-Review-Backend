const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')

const userRoute=require("./routes/user.route");
const bookRoute=require("./routes/books.route");
const reviewRoute=require("./routes/review.route");
const connectDB=require("./db/mongo.db");
const errorHandler = require('./middleware/errorHandler');


const app=express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/",userRoute);
app.use("/",bookRoute);
app.use("/",reviewRoute);

app.use(errorHandler)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})