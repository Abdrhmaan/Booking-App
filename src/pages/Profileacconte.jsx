

import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContex';
import {Link, Navigate,useParams} from "react-router-dom"
import axios from "axios"
import AcconteNav from './AcconteNav';
const Profileacconte = () => {
    
    const {user,setUser,ready} = useContext(UserContext);
    const [redrate,setRedrate] = useState(null);
    function logout() {
        axios.post("/api/logout")  
        setUser(null)
        setRedrate("/")
 
         
       }

       
      if(redrate){
        return <Navigate to={'/'} />
      }
 
  return (

    <div className=' max-w-lg mx-auto  mt-9 text-center '>
          <AcconteNav/>
    <div className="max-w-full p-4 bg-gray-200 rounded-md flex flex-col items-center">
   <h2 className="text-2xl font-bold mb-4">{user?.name}</h2>
   <p className="text-gray-700 mb-2">{user?.email}</p>
   <button className="bg-primary text-white py-2 px-4 rounded-md" onClick={logout}>
     Logout
   </button>
 </div>
  
     
         </div>
  )
}

export default Profileacconte