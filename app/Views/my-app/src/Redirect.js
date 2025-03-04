import { useEffect } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
export default function Redirect(){
    const {id} = useParams()
    useEffect(()=>{
        (async()=>{
             try{
                const response = await axios.get(`http://localhost:4004/${id}`)
                const longUrl=response.data 
                console.log(longUrl)
                if(longUrl){
                    window.location.href=longUrl
                }else{
                    alert("short link found")
                }
             }
             catch(err){
                console.log(err)
                alert("an error occured while processing the link")
             }
        })()
    },[id]) 
  
    return <p>redirecting</p>
}