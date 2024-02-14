import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"

import { Navigate} from "react-router-dom";

import { useContext } from 'react';
import { UserContext} from '../UserContex';

const Loginpage = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redrate,setRedrate] = useState(false);



  const {setUser} = useContext(UserContext)
  


  async function handlesubmit(ev) {
    ev.preventDefault();
  
    try {
      const {data} = await axios.post("/api/login", {
        email,
        password,
      });
      setUser(data)
      alert('login successful. Now you can log in');
      setRedrate(true)
    } catch (error) {
      console.error("login error:", error);
      alert('login failed. Please try again later');
    }

  }

 
  if (redrate) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-20 grow flex items-center justify-around gap-2">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto"  onSubmit={handlesubmit}>
          <input type="email" placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)} />

          
          
          <input type="password" placeholder="password" 
            onChange={ev => setPassword(ev.target.value)} />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/registar'}>Register now</Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Loginpage;
