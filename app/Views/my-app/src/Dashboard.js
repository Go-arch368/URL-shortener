import {useState} from "react"
import axios from "axios"
export default function Dashboard(){
    const [data,setData] = useState({
        longUrl:"",
        expiryDate:""
    })

    const [url,setUrl]=useState(null)
   async function handleSubmit(e){
        e.preventDefault()
        try{
            const responseData = await axios.post("http://localhost:4004/api/url",data,{headers:{Authorization:localStorage.getItem("result")}})
            console.log(responseData.data)
            const result = responseData.data.shortUrl
            setUrl(result)
            console.log(responseData)
        }
        catch(err){
            console.log(err.data)    
        }
    }

 
    return(
        <div>
            <h1>this is your dashboard component</h1>
             <form onSubmit={handleSubmit}>
                <input type="text" value ={data.longUrl} onChange={(e)=>{setData({...data,longUrl:e.target.value})}}/>
                <input type ="date" value={data.expiryDate} onChange={(e)=>{setData({...data,expiryDate:e.target.value})}}/>
                <input type="submit" value="shorten url"/>
             </form>
             <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      
        </div>
    )
}