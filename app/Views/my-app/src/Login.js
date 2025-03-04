import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useContext } from "react"
import AuthContext from "./AuthContext/context"
export default function Login(){
     const {handleLogin} = useContext(AuthContext)
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
                const responseData = await axios.post("http://localhost:4004/api/login",form)
                const result = responseData.data
                localStorage.setItem("result",result.token)
                console.log(responseData.data.user);

                const response= await axios.get("http://localhost:4004/api/getpersons",{headers:{Authorization:localStorage.getItem("result")}})
                const res=response.data
                handleLogin(res)
                
                console.log(localStorage.getItem("result"))
                navigate("/dashboard")
            }
            catch(err){
                console.log(err)
            }
        }
     
    }
     

    return(

        <div>
            <h1>Login Page</h1>
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