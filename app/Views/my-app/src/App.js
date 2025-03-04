import React from 'react';
import { Routes, Route,Link,useNavigate} from 'react-router-dom';
import Register from './Register';
import Dashboard from './Dashboard';
import Allurl from './Allurl';
import Login from "./Login"
import "./index.css"
import { useContext } from 'react';
import AuthContext from './AuthContext/context';
import Redirect from './Redirect';
import PrivateRoute from './AuthProvider/PrivateRoute';
function App() {
   const {isLoggedIn,user,handleLogOut} = useContext(AuthContext)
   const navigate = useNavigate()
   console.log(user)
   console.log(isLoggedIn)
  return (
     
    <div className="App">

       <ul>
       {isLoggedIn?
       <>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/allurls">AllUrls</Link></li>
    
        <button onClick={()=>{
          handleLogOut()
          localStorage.removeItem("result")
          navigate("/register")
        }}>logout</button>
       </>
       :
  <> 
     <li><Link to="/register">Register</Link></li>
     <li><Link to="/login">Login</Link></li>
  </>    
        }
      
       </ul>
       
     
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/allurls" element={<PrivateRoute><Allurl/></PrivateRoute>}/>
        <Route path="/:id" element={<Redirect/>}/>
        <Route path="/login" element ={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
