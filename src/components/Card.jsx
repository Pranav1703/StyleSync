import React from 'react'
import "../styles/card.css"

const Card = ({name,imgsrc}) => {
  return (
    <div className='card'>
        <img src={imgsrc} alt="" />
        <h4>{name}</h4>
    </div>
  )
}

export default Card