import { useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"

import { Navigate} from "react-router-dom";
const Regisatepage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redrate,setRedrate] = useState(false);


  async function registerUser(ev) {
    ev.preventDefault();
  
    try {
      const res = await axios.post("api/register", {
        name,
        email,
        password,

      });
  
      console.log(res);
      setRedrate(true)
      alert('Registration successful. Now you can log in');
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
  
      alert('Registration failed. Please try again later');
    }
  }
  


 
  if (redrate) {
    return <Navigate to={'/login'} />
  }


  return (

        <div className="mt-20 grow flex items-center justify-around gap-2">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">REGISTAR</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text" placeholder="NAME"
                  value={name}
                  onChange={ev => setName(ev.target.value)} />
            
       
              <input type="email" placeholder="your@email.com"
                               value={email}
                               onChange={ev => setEmail(ev.target.value)} />
              
              
            
              <input type="password" placeholder="password" 
               value={password}
               onChange={ev => setPassword(ev.target.value)} />

              <button className="primary">Registar</button>
              <div className="text-center py-2 text-gray-500">
                al ready Registar <Link className="underline text-black" to={'/login'}>Login  now</Link>
              </div>
            </form>
          </div>
        </div>
      );
  
}

export default Regisatepage