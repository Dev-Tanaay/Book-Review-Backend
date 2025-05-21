const { signUpService,loginService } = require("../services/user.service");
const signUp=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user=await signUpService(username,email,password);
        if(!user){
            return res.status(400).json({ message: "User already exists" });
        }
        res.status(201).json({ message: "User signed up successfully" });
        
    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login=async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const { user,token }=await loginService(email,password);
        if(!user){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({ message: "User logged in successfully",token });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

module.exports={signUp,login};
