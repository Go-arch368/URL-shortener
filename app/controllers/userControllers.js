import User from "../models/userModel.js";
const userCltr={}
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


userCltr.reg=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({error:errors.array()})
    }
    const body =req.body
    const user = new User(body)
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(body.password,salt)
    user.password=hash
    await user.save()
    res.json(user)
}

userCltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
     return res.status(400).json({error:errors.array()})
    }
    const body=req.body
    try{
       const user = await User.findOne({email:body.email})
 
       if(!user){
         return  res.status(404).json({error:"invalid email or password"})
       } 

       const isValid=await bcrypt.compare(body.password,user.password)

       if(!isValid){
        return res.status(404).json({error:"invalid email or password"})
       }
     const token= jwt.sign({userId:user._id},"Secret@123",{expiresIn:"7d"})
       res.json({token,user})
    }  
    catch(err){
      res.json({error:err.message})
      console.log("error ")
    }
}

userCltr.person=async(req,res)=>{
    try{
       const users = await User.findById(req.currentUser.userId)
       return res.json(users)
    }
    catch(err){
       console.log(err)
    } 
}



export default userCltr