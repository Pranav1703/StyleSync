import React, { useState } from 'react'
import axios from 'axios'
import "../styles/pageTwo.css"
import fileDownload from 'js-file-download'

const PageTwo = () => {

  const [promt,setPrompt] = useState()
  const [imgData,setImgData] = useState()
  const [img,setimg] = useState()
  const genImg = async()=>{
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-image/",{
        "prompt": "generate an image of tshirt with military design, kept on a white background",
        "negative": "poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, low resolution, blurry image, oversaturated, bad anatomy, signature, watermark, username, error, missing limbs, error, out of frame, extra fingers, mutated hands, poorly drawn hands, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username",
        "width": 1024,
        "height": 1024,
        "use_add": true    
  
      })
      console.log(response)
      setImgData(response.data)
    } catch (error) {
      console.log(error)
    }
    
  }

  // const downloadFile = (url, filename) => {
  //   axios.get(url, {
  //     responseType: 'blob',
  //   }).then(res => {
  //     fileDownload(res.data, filename);
  //   });
  // }

  // {
  //   "prompt": "generate an image of tshirt with military design, kept on a white background",
  //   "negative": "poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, low resolution, blurry image, oversaturated, bad anatomy, signature, watermark, username, error, missing limbs, error, out of frame, extra fingers, mutated hands, poorly drawn hands, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username",
  //   "width": 1024,
  //   "height": 1024,
  //   "use_add": true
  // }

  const testUrl = "http://127.0.0.1:8000/generate-image/"
  
  // fileDownload(testUrl,"testImage")

  return (
    <div className='pageTwo'>
        <div className="input">
          <input type="text" name="prompt" id="inputText" onChange={(e)=>setPrompt(e.target.value)} />
          <button onClick={genImg}>Genrate Image</button>
        </div>
        <button onClick={downloadFile(url,"genratedImage.jpg")}>download</button>
        <img src={img} alt="generatedImage" />
    </div>
  )
}

export default PageTwo