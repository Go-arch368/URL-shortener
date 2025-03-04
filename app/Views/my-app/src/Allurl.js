import { useEffect, useState } from "react";
import axios from "axios";
import './index.css'
import {Chart} from "react-google-charts"

export default function Allurl() {
  const [form,setForm] = useState({shortUrl:""})
  const [data, setData] = useState([]);
  const [count,setCount] = useState(0)
  const [device,setDevice] = useState()
  const [edit,setEdit] = useState()
  const [deviceObj, setDeviceObj] = useState([])
 const [data2,setData2] = useState([])
  useEffect(() => {
    (async () => {
      try {
        const responseData = await axios.get(
          "http://localhost:4004/api/fetchall",
          { headers: { Authorization: localStorage.getItem("result") } }
        );
        const result = responseData.data;
        console.log(responseData.data)
        setData(result);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    })() 
  },[]);



  async function handleDelete(id) {
    try {
      const responseData = await axios.delete(
        `http://localhost:4004/api/destroy/${id}`
      );
      const result = responseData.data;
      setData((data) => data.filter((item) => item._id !== id)); 
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  

  function handleInc(inc){

    setCount(inc.clickCount)
    setDevice(inc.deviceInfo)

        let obj={}
       const countries = inc.locationInfo.map(ele=>ele.country)
       countries.forEach(country => {
        if (obj[country]) {
          obj[country]++;
        } else {
          obj[country] = 1;
        }
      });
      console.log(Object.entries(obj))


      
   
      const data3=[["country","popularity"],...Object.entries(obj)]
      setData2(data3) 
         const entry = [['mobile', 'desktop'],...Object.entries(inc.deviceInfo)]
       console.log(entry)
       setDeviceObj(entry)
     
  }

 /*  function handleEdit(id){
     const ans = data.find((ele)=>ele._id==id)
     setEdit(ans)
     console.log(ans)
  }  */
 function handleEdit(id){
  const ans = data.find((ele)=>ele._id==id)
  setEdit(ans)
 }




  async function handleSubmit(e){
    e.preventDefault()
    try{
     const response = await axios.put(`http://localhost:4004/api/destroy/${edit._id}`, form)
     console.log(response.data)
     setData((data)=>data.map((ele)=>ele._id==edit._id?{...ele,shortUrl:form.shortUrl}:ele))
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
      if(edit){
        setForm({
          shortUrl:edit.shortUrl
        })
      }
  },[edit])

   
   
   

  return (
    <div>
      <h1>Getting URLs</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Actions</th>
        
          </tr>
        </thead>
        <tbody>
          {data.map((ele) => (
            <tr key={ele._id}>
              <td>
              <a href={ele.shortUrl} target="_blank" rel="noopener noreferrer">{ele.shortUrl}</a>
              </td>
              <td>
                <button onClick={()=>{handleEdit(ele._id)}}>Edit</button>
                <button onClick={() => handleDelete(ele._id)}>Delete</button>
                <button onClick={()=>handleInc(ele)}>Analysis</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   
   <div className="clickCount">
    {count>0&&(
      <>
          
   <h2>Total Click</h2>
   <h4>{count}</h4>
    <h2>Devices</h2>
   <h4>mobile-{device?.mobile} desktop-{device?.desktop}</h4> 
      </>
   ) }
  
  <Chart
      chartType="PieChart"
      data={deviceObj}
      width={"100%"}
      height={"400px"}
    />

<Chart
      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="100%"
      height="100%"
      data={data2}
    />  

   </div>

   <form onSubmit={handleSubmit}>
       <h2>Edit Form</h2>
      <input type ="text" value={form.shortUrl} onChange={(e)=>{setForm({...form,shortUrl:e.target.value})}}/><br/>
      <input type="submit" value="submit"/>
   </form> 
     
    </div>
  );
}
