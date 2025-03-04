import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"

export default function Register(){
    
    const [form,setForm] = useState({
        email:"",
        password:""
    })
    const navigate= useNavigate()
    const [clientValidation,setClientValidation] = useState(null)
    const errors={}
    function validation(){
      if(!form.email){
         errors.email="the email field is required"
      }
      if(!form.password){
        errors.password="the password field is required"
      }
    }
   async function handleSubmit(e){
        e.preventDefault()
        validation()
        if(Object.keys(errors).length!==0){
            setClientValidation(errors)
        }
        else{
            setClientValidation({})
            try{
                const responseData = await axios.post("http://localhost:4004/api/post",form)
                const result = responseData.data
              
            
                navigate("/login")
            }
            catch(err){
                console.log(err)
            }
        }
     
    }
     

    return(

        <div>
            <h1>Regiter Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type ="email" value={form.email} onChange={(e)=>{setForm({...form,email:e.target.value})}}/><br/>
                {clientValidation&&<span style={{color:"red"}}>{clientValidation.email}</span>}<br/>
                 <label>Password:</label>
                <input type = "password" value={form.password} onChange={(e)=>{setForm({...form,password:e.target.value})}}/>
                <br/>
                {clientValidation&&<span style={{color:"red"}}>{clientValidation.password}</span>}<br/>
                <input type ="submit"/>
            </form>
        </div>
    )
}