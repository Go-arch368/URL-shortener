import {Schema,model} from "mongoose"

const urlSchema = new Schema ({
    longUrl:String,
    shortUrl:{
        type:String,
        unique:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    expiryDate:Date,
    clickCount: { type: Number, default: 0 },
    deviceInfo: [
      {
        deviceType: String, // e.g., "mobile" or "desktop"
        count: { type: Number, default: 0 },
      },
    ],
    locationInfo: [
        {
          country: { type: String, default: 'Unknown' },
          timestamp: { type: Date, default: Date.now },
        },
      ],
},{timestamps:true})

const Url = model("Url",urlSchema)

export default Url