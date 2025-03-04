import mongoose from "mongoose"

const configuredb=async()=>{
    try{
        const db = await mongoose.connect("mongodb://localhost:27017/shortenURL")
        console.log("your db is successfully connected")
    }
    catch(err){
        console.log(err)
    }   
}

export default configuredb