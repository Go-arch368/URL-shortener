const urlValidator ={
    longUrl:{
       exists:{
        errorMessage:"the longUrl field is required"
       },
       notEmpty:{
        errorMessage:"the longUrl field is required"
       },
       isLength:{
        min:10,
        max:200,
        errorMessage:"the longUrl length should be atleast min of 10 and maximum of 200 length"
       },
       trim:true
    }
}

export default urlValidator