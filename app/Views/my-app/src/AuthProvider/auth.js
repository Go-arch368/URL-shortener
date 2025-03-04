import { useEffect, useReducer } from "react";
import AuthContext from "../AuthContext/context";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import reducer from "../Reducer/reducer";
const initialState = {
    isLoggedIn:false,
    user:null
}

export default function AuthProvider(props){
    const navigate = useNavigate()
    const [userstate,userdispatch] = useReducer(reducer,initialState)

     function handleLogin(user){
        userdispatch({type:"LOGIN",payload:{isLoggedIn:true,user:user}})
     }

     function handleLogOut(){
        userdispatch({type:"LOGOUT",initialState})
        localStorage.removeItem("result")
     }
      
     useEffect(()=>{
        (async()=>{
            if(localStorage.getItem("result")){
                try{
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
        })()
     },[])

       if(localStorage.getItem("result")&&!userstate.user){
        return <p>loading...</p>
       }

   return(
     <div>
        <AuthContext.Provider value={{...userstate,userdispatch,handleLogin,handleLogOut}}>
            {props.children}
        </AuthContext.Provider>
     </div>
   )
  

}

