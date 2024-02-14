
import React from 'react'
import Image from '../components/Image'

const Placeimage = ({place,index=0,className=null}) => {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={place.photos[index]} alt=""/>
  )
}

export default Placeimage