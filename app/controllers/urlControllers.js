import Url from "../models/urlModel.js";
const urlCltr={}
import shortid from "shortid";
import { validationResult } from "express-validator";
import geoip from "geoip-lite"
import cron from "node-cron"



urlCltr.posting=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(500).json({error:errors.array()})
    }
    try{
        const shorturl = shortid.generate()
        console.log(shorturl)
        const {longUrl}= req.body
      
        const urlDetails =new Url({ longUrl, shortUrl: `http://localhost:3000/${shorturl}`, createdBy: req.currentUser.userId,expiryDate:new Date() })
        await urlDetails.save()
        res.json(urlDetails)
    }
    catch(err){
        console.log(err)
    }
}

urlCltr.fetching=async(req,res)=>{
    try{
       
        const getDetails = await Url.find({createdBy:req.currentUser.userId})
        console.log(getDetails)
     
        return res.json(getDetails)
    }
    catch(err){
        console.log(err)
    } 
}

cron.schedule("0 0 * * *",async()=>{
   try{
    console.log("running cron cleaning up")
    const deleteDetails = await Url.deleteMany({
       expiryDate:{$lt:new Date()}
    })
   }
   catch(err){
    console.log(err)
   }
})

cron.schedule('1,2,4,5 * * * *', () => {
  console.log('running every minute 1, 2, 4 and 5');
});

urlCltr.redirectToLongUrl = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const ip = "8.8.8.8"; // Mock IP (replace with actual client IP logic)
    //console.log("Client IP:", ip);
  
    const geo = geoip.lookup(ip);
    if (!geo) {
      console.log("Geo lookup failed for IP:", ip);
    }
  
    const deviceInfo = req.useragent;
    //console.log("Device Info:", deviceInfo);
  
    const isMobile = deviceInfo?.isMobile || false;
    const isDesktop = deviceInfo?.isDesktop || false;
    // console.log(isDesktop)
    const url = await Url.findOne({ shortUrl: `http://localhost:3000/${id}` });
    if (!url) {
      return res.status(404).json("URL not found");
    }
  
    //console.log(`Current click count: ${url.clickCount}`);
   // console.log("Device Info:", { isMobile, isDesktop });
  
    const updatedUrl = await Url.findByIdAndUpdate(
      url._id,
      {
        $inc: {
          clickCount: 1,
          "deviceInfo.mobile": isMobile ? 1 : 0,
          "deviceInfo.desktop": isDesktop ? 1 : 0,
        },
        $push: {
          locationInfo: {
            country: geo?.country || "Unknown",
            timestamp: new Date(),
          },
        },
      },
      { new: true }
    );
  
    //console.log(`Updated click count: ${updatedUrl.clickCount}`);
    res.json(updatedUrl.longUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};


urlCltr.destroy=async(req,res)=>{
    try{
        const id = req.params.id
        const del = await Url.findByIdAndDelete(id)
        if(!del){
            return res.status(404).json("your id is not found")
        }
        res.json(del)
    }
    catch(err){
        console.log(err)
    }
}

urlCltr.update=async(req,res)=>{
    try{
        const {shortUrl}= req.body
        const id = req.params.id
        const url = await Url.findById(id)
        if(!url){
             return res.json("your id is not found")
        }
        const update = await Url.findByIdAndUpdate(id,{shortUrl},{new:true,runValidators:true})
        return res.status(200).json(update)
    }
    catch(err){
        console.log(err)
    }
}
export default urlCltr 