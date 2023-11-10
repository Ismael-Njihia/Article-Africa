import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";

export const vericationController = asyncHandler(async(req,res)=>{
    const {email, verificationCode} = req.body;
    //verify email
    //find user
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    //check if user is already verified
    if(user.isVerified){
        res.status(400);
        throw new Error("User is already verified");
    }
    //check if verification code is correct
    if(verificationCode !== user.verificationCode){
        res.status(400);
        throw new Error("Invalid verification code");
    }
    //update user
    user.isVerified = true;
    //delete verification code
    user.verificationCode = 1234;

    //save user
    await user.save();
    //send response
    res.status(200).json({
        message: "User verified successfully"
    })
    

})