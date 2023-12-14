import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import Listing from "../models/listing.model.js"

export const  test=(req,res)=>{
    res.json({
        message:"helllloooo"
    })
}
export const updateUser= async (req,res,next)=>{
if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only update your profile'))
 try{
if(req.body.password){
    req.body.password =bcrypt.hashSync(req.body.password,10)
}
const updateUser= await User.findByIdAndUpdate(req.params.id,{
    $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        avatar:req.body.avatar,
    }
},{new:true}
);
const {password, ...rest} = updateUser._doc;
  res.status(200).json(rest);

}
catch(err){
   next(err);
}

}


//delete user 
export const deleteUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only delete your account'))
 try{
  await User.findByIdAndDelete(req.params.id)
   res.clearCookie('access_token')
  res.status(200).json('User has been deleted!')


} 
catch(error){
next(error)
}
}

 export const getUserLisings= async( req,res,next)=>{
 if(req.user.id === req.params.id){
   try{
    const listing= await Listing.find({userRef: req.params.id})
   res.status(200).json(listing)
   }catch(err){
    next(err)
   }
 }
 else{
    return next(errorHandler(401,'You can see Only your listings'))
 }
 }

export const getUser= async(req,res,next)=>{
try{
 const user= await User.findById(req.params.id);
 if(!user) return next(errorHandler(404, "User not found!"))
 const {password, ...rest} = user._doc;
 res.status(200).json(rest)
}
catch(err){
    next(err)
}
}