import React, { useState } from 'react'
import axios from 'axios'
import "../styles/pageTwo.css"
import fileDownload from 'js-file-download'
import { type } from '@testing-library/user-event/dist/type'

const PageTwo = () => {

  const [promt,setPrompt] = useState()

  const [imgSrc,setimgSrc] = useState()
  const genImg = async()=>{
    try {
      // const response = await axios.post("http://127.0.0.1:8000/generate-image/",{
      //   "prompt": "generate an image of tshirt with military design, kept on a white background",
      //   "negative": "poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, low resolution, blurry image, oversaturated, bad anatomy, signature, watermark, username, error, missing limbs, error, out of frame, extra fingers, mutated hands, poorly drawn hands, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username",
      //   "width": 1024,
      //   "height": 1024,
      //   "use_add": true    
  
      // })

      // console.log(response.data)
      // if(response.data.status==="successful"){
      //   try {
      //     const response = axios.get("http://127.0.0.1:8000/get-image/");
      //     setimgSrc(response.static_file_url)
      //   } catch (error) {
          
      //   }
      // }
      const response = await axios.get("http://127.0.0.1:8000/get-image/",{responseType:"blob"});
      console.log(response)
      
      setimgSrc(URL.createObjectURL(response.data))

      
  

      // const blob = new Blob([Uint8Array.from(atob(byteArrayString), c => c.charCodeAt(0))], { type: "image/jpeg" });

      // console.log(response.data)
      // const blob = new Blob([response.data], { type: "image/jpeg" });

      
      // console.log("type of blob",typeof(blob))
      // // const url = URL.createObjectURL(blob);
      // // console.log(url);
      // console.log("blob data: ",blob)
      // const url = URL.createObjectURL(blob);
      // console.log(url);
      // fileDownload(blob,"genImgCurr.jpg")
      // setimgSrc(url);

      
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

  // const testUrl = "http://127.0.0.1:8000/generate-image/"
  
  // fileDownload(testUrl,"testImage")

  return (
    <div className='pageTwo'>
        <div className="input">
          <input type="text" name="prompt" id="inputText" onChange={(e)=>setPrompt(e.target.value)} />
          <button onClick={genImg}>Genrate Image</button>
        </div>
        <button >download</button>
        <img src={imgSrc} alt="generatedImage" />
    </div>
  )
}

export default PageTwo