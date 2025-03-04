import jwt from "jsonwebtoken"

export default function authenticateUser(req,res,next){
    const token = req.headers["authorization"]
    if(!token){
        return res.status(403).json("token is required")
    }
    try{ 
        const tokenData = jwt.verify(token,"Secret@123")
        req.currentUser={userId:tokenData.userId}
        next()
    }
    catch(err){
        console.log(err)
    }
  
}