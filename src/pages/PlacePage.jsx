import React, { useEffect, useState } from 'react'
import { Link ,useParams} from 'react-router-dom'
import axios from "axios"
import Placeimage from './Placeimage';

const PlacePage = () => {
  const [place,setPlace] = useState([]);




 useEffect(() => {

  axios.get("/api/user-places").then(({data}) => {
    setPlace(data);
  })



 },[])

  return (


    <div>


  <div className='text-center mt-6'>
      <Link className='bg-primary text-white py-3 px-4 rounded-full' to={"/account/place/new"} > Add new place </Link>
    </div>
    






    <div className="mt-4">
  {place.length > 0 &&
    place.map((place) => (
      <Link
        to={'/account/place/' + place._id}
        className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl hover:shadow-md transition-all duration-300"
      >
        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0 overflow-hidden rounded-lg">
          {place.photos.length > 0 && (
            <img
              src={'http://localhost:3000/uploads/' + place.photos[0]}
              alt={place.title}
              className="w-full h-full object-cover object-center"
            />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{place.title}</h2>
          <p className="text-sm mt-2">{place.description}</p>
        </div>
      </Link>
    ))}
</div>


    </div>
     
  
  )
}

export default PlacePage