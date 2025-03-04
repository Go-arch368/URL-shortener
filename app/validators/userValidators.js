import User from "../models/userModel.js"
const userValidators = {
    email:{
        exists:{
            errorMessage:"the email field is required"
        },
        notEmpty:{
            errorMessage:"the email field should not be empty"
        },
        isEmail:{
            errorMessage:"the email should be in valid form"
        },
        custom:{
            options:async(value)=>{
              
                    const user = await User.findOne({email:value})
                    if(user){
                        throw new Error("the email is already taken")
                    }
                    return true
                }
            },
        normalizeEmail:true,
        trim:true    
        },
        password:{
            exists:{
                errorMessage:"the password field is required"
            },
            notEmpty:{
                errorMessage:"the password field should be empty"
            },
            isStrongPassword:{
                options:{
                    minLength:8,
                    minUppercase:1,
                    minLowercase:1,
                    minSymbol:1,
                    minNumber:1
                },
                errorMessage:"the password should contain one uppercase one lowercase one symbol one number"
            },
            trim:true
        }
    }
export default userValidators
