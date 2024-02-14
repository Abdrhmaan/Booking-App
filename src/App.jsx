import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  {Route, Routes} from "react-router-dom";
import Indexpage from './pages/Indexpage';
import Loginpage from './pages/Loginpage';
import Layout from './components/Layout';
import Regisatepage from './pages/Regisatepage';

import {UserContextProvider} from "./UserContex"
import axios from "axios"
import Accont from './pages/Accont';

import PlaceFormpage from './pages/PlaceFormpage';
import PlacePage from './pages/PlacePage';
import Profileacconte from './pages/Profileacconte';
import Singleplage from './pages/Singleplage';
import Bookinpage from './pages/Bookinpage';
import Bookingspage from './pages/Bookingspage';



function App() {
 
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
    
    <Routes>
    <Route path='/'  element={<Layout/>}>
      
    <Route index  element={<Indexpage/>}/>
    <Route path='/login'  element={<Loginpage/>}/>
 
    <Route path='/registar'  element={<Regisatepage/>}/>
    <Route path='/account'  element={<Accont/>}/>
    <Route path='/account/profile'  element={<Profileacconte/>}/>
    <Route path='/account/place'  element={<PlacePage/>}/>
    <Route path='/account/place/new'  element={<PlaceFormpage/>}/>
    <Route path='/account/place/:id'  element={<PlaceFormpage/>}/>
    <Route path='/place/:id'  element={<Singleplage/>}/>
    <Route path='/account/bookings/:id'  element={<Bookinpage/>}/>
    <Route path='/account/bookings' element={<Bookingspage/>}/>

   

    </Route>


    </Routes>
    </UserContextProvider>
    /*
  
    */
   
  )


  
}



export default App
