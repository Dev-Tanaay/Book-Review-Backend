const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signUpService=async(username,email,password)=>{
    const slatRounds=10;
    const hashedpassword=await bcrypt.hash(password, slatRounds);
    try {
        const existingUser=await User.findOne({email});
        if(existingUser){
            throw new Error("User already exists");
        }
        const user=await new User({
            username,
            email,
            password:hashedpassword
        })
        const savedUser=await user.save();
        if(!savedUser){
            return null;
        }
        return true;
    } catch (error) {
        console.error("Error saving user:", error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        const token = generateToken(user._id);
        return { user, token };
    } catch (error) {
        console.error("Error logging in user:", error.message); 
        throw new Error("Error logging in user"); 
    }
};

module.exports={signUpService,loginService};