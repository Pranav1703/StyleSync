import React from 'react'
import "../styles/result.css"
const Result = ({src}) => {
  return (  
    <div className="result">
        <img src={src} alt="result img" id='resultImg'/>
    </div>
  )
}

export default Result