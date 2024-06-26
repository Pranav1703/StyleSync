import React from "react";
import "../styles/pageOne.css";
import { useState } from "react";
import Card from "./Card";
import Result from "./Result";
import { Link } from "react-router-dom";
// import { ChakraProvider } from '@chakra-ui/react';
// import {
//     Slider,
//     SliderTrack,
//     SliderFilledTrack,
//     SliderThumb,
//   } from '@chakra-ui/react'

import Slider from "@mui/material/Slider";

const PageOne = () => {
  const [file, setFile] = useState();
  //   const [clothes,setClothes] = useState()
  const [imageVal, setImageVal] = useState(0);
  const [steps, setSteps] = useState(0);
  const [scale, setScale] = useState(0);
  const [seed, setSeed] = useState(0);

  function fileChangeHandler(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }



  const clothes = [
    {
      imgsrc:
        "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/17be2cb25fbaf290429dfe49b018dd7b.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
      name: "Summer Clothes",
      id: 1,
    },
    {
      imgsrc:
        "data:image/jpeg;base64,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",
      name: "Floral Dress",
      id: 2,
    },
    {
      imgsrc:
        "https://qph.cf2.quoracdn.net/main-qimg-075434771370ded287d2cb7232fb413e-lq",
      name: "Formal White Shirt",
      id: 3,
    },
    {
      imgsrc:
        "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F87%2F7d%2F877d125fd799a5ecbafb32042cd685bbc6a35592.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
      name: "Grey Loose Fit Zip-through",
      id: 4,
    },
    {
      imgsrc:
        "data:image/jpeg;base64,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",
      name: "Three Piece Suit - Black",
      id: 5,
    },
    {
      imgsrc:
        "data:image/jpeg;base64,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",
      name: "Locomoto Female dress",
      id: 6,
    },
    {
      imgsrc:
        "https://media.istockphoto.com/id/993728724/photo/full-length-man-mannequin.jpg?s=612x612&w=0&k=20&c=ivbhIbcK8djPIviHLCPt1kjWlbDBslgQkd1Z02hAKmk=",
      name: "Summer casual Shirt",
      id: 7,
    },
  ];

  return (
    <div className="container">
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
      <h3 className="page_2_heading">Try on what suits you best !!</h3>
      <div className="main">
        <div className="imageUpload">
          <div className="preview">
            {file ? (
              <img src={file} alt="previewImg" />
            ) : (
              <h3>Upload your image</h3>
            )}
          </div>
          <input type="file" id="imgUpload" onChange={fileChangeHandler} />
        </div>
        <div className="clothes">
          {clothes.map((i) => (
            <a href={i.imgsrc}>
              <Card key={i.id} name={i.name} imgsrc={i.imgsrc} />
            </a>
          ))}
        </div>
        <button className="run" >RUN</button>
        <div className="menu">
          <div className="images">
            <p>images: {imageVal}</p>
            <Slider
              value={imageVal}
              onChange={(e, val) => setImageVal(val)}
              defaultValue={30}
              min={0}
              max={100}
            />
          </div>
          <div className="steps">
            <p>Steps: {steps}</p>
            <Slider
              value={steps}
              onChange={(e, val) => setSteps(val)}
              defaultValue={30}
              min={0}
              max={100}
            />
          </div>
          <div className="guidance_scale">
            <p>Guidance Scale: {scale}</p>
            <Slider
              value={scale}
              onChange={(e, val) => setScale(val)}
              defaultValue={30}
              min={0}
              max={100}
            />
          </div>

          <div className="seed">
            <p>seed: {seed}</p>
            <Slider
              value={seed}
              onChange={(e, val) => setSeed(val)}
              defaultValue={30}
              min={0}
              max={100}
            />
          </div>
        </div>
      </div>

      <Result src={file} />
    </div>
  );
};

export default PageOne;
