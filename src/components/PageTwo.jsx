import React, { useState } from 'react'
import axios from 'axios'
import "../styles/pageTwo.css"
import fileDownload from 'js-file-download'
import { Link } from 'react-router-dom'

const PageTwo = () => {

  const [prompt,setPrompt] = useState()

  const [imgSrc,setimgSrc] = useState()
  const genImg = async()=>{
    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-image/",{
        "prompt": prompt,
        "negative": "poorly Rendered face, poorly drawn face, poor facial details, poorly drawn hands, poorly rendered hands, low resolution, blurry image, oversaturated, bad anatomy, signature, watermark, username, error, missing limbs, error, out of frame, extra fingers, mutated hands, poorly drawn hands, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, username",
        "width": 1024,
        "height": 1024,
        "use_add": true    
  
      })
      console.log(response)
      
      if(response.data.status==="successful"){
          try {
            const res = await axios.get("http://127.0.0.1:8000/get-image/")
            console.log(res);
            
            setimgSrc(res.data.static_file_url);
            // fileDownload(res.data, "generatedImge.jpg");
          } catch (error) {
            console.log(error);
          }
      } 
    } catch (error) {
      console.log(error)
    }
    // try {
    //   const res = await axios.get("http://127.0.0.1:8000/get-image/")
    //   console.log(res);
      
    //   setimgSrc(res.data.static_file_url);
    //   // fileDownload(res.data, "generatedImge.jpg");
    // } catch (error) {
    //   console.log(error);
    // }
    
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
    <>
      <div className="navbar">
        <div className="nav_left">
          <div className="logo"></div>
          <div className="logo_text">StyleSync</div>
        </div>
        <div className="nav_middle">
          <div className="home">
            <Link to="/">Home</Link>
          </div>
          <div className="home">
            <a href="#about">About</a>
          </div>
          <div className="home">
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="nav_right">
          <div className="sign">Sign in</div>
        </div>
      </div>
      <div className="pageTwo">
        <div className="customize">Generate your Garments</div>
        <div className="input">
          <input
            type="text"
            name="prompt"
            id="inputText"
            className="inputText"
            placeholder="Customize your clothes"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className="generate" onClick={()=>genImg()}>Generate Image</button>
        </div>

        <div className="result_download">
          <img src={imgSrc} alt="Generated Image" />
          <button className="download">Download</button>
        </div>
    </div>
    </>
  )
}

export default PageTwo;
