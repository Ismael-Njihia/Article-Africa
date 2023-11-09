import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/UserModel.js";

export const vericationController = asyncHandler(async(req,res)=>{
    const {vericationCode} = req.body;
    res.send('working')

})