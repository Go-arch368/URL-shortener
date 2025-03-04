import {Navigate} from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../AuthContext/context";
export default function PrivateRoute(props){
    const {user} =useContext(AuthContext)
    if(!localStorage.getItem("result")&&!user){
        return <Navigate to="/login" replace/>
    }
    else{
        return props.children
    }
}