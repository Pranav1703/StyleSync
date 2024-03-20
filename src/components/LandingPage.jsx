import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/style.css"
import img1 from "../assests/black_girl.jpg"
import koreanjpg from "../assests/korean.jpg"
import man3 from "../assests/man_3-removebg-preview.png"
import { useState} from 'react'

const LandingPage = () => {
  
  const [formData,setFormData] = useState({})
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");

  const submitHandler = ()=>{
    
    setFormData({
        name: name,
        email: email,
        message: msg
    })
    console.log(formData);
    setName("");
    setEmail("")
    setMsg("")
  }

// //code for getting the contact detail in google form
// // const scriptURL =
// //   "https://script.google.com/macros/s/AKfycbyIH2jk4nkBD2F1Y_oOIidy9R8tDLIeHRoi2qBdQoZqxkD8TjMt6UVoUTY-aV-B2nTfQQ/exec";
// // const form = document.forms["submit-to-google-sheet"];
// // const msg = document.getElementById("msg");

// // form.addEventListener("submit", (e) => {
// //   e.preventDefault();
// //   fetch(scriptURL, { method: "POST", body: new FormData(form) })
// //     .then((response) => {
// //       msg.innerHTML = "Message sent successfully";
// //       setTimeout(function () {
// //         msg.innerHTML = "";
// //       }, 5000);
// //       form.reset();
// //     })
// //     .catch((error) => console.error("Error!", error.message));
// // });




  return (
    <>
    <div className="navbar">
        <div className="nav_left">
            <div className="logo"></div>
            <div className="logo_text">StyleSync</div>
        </div>
        <div className="nav_middle">
            <div className="home"><a href="#home">Home</a></div>
            <div className="home"><a href="#about">About</a></div>
            <div className="home"><a href="#contact">Contact</a></div>
        </div>
        <div className="nav_right">
            <div className="sign">Sign in</div>
        </div>
    </div>

    <div className="main_page">

        <div className="main_left">
            <div className="style_heading">
                <span className="style">Style</span> your <br/>
                <span className="fashion">Fashion</span>
            </div>

            <div className="style_para">
                StyleSync is a platform where you can virtually see which <br/> cloth suits you.The best part of it is
                that,
                it wont overlap <br/> the garments on your own cloth but it diffuses with your old <br/>cloth and you
                automatically
                wear a new cloth.
            </div>

        </div>


        <div className="main_right">
            <img src={man3} alt=""/>
        </div>

    </div>

    <div className="main_page_2" >
        <div className="box-1">
            <div className="box">
                <div className="card_1">
                    <img src={img1} alt="" />
                    <div className="card_1_des">Virtual Wardrobe Fusion</div>
                    <div className="try"><Link to="/pageOne">Try Now</Link></div>
                </div>

            </div>

            <div className="box">
                
                <div className="card_2"  >
                    <img src={koreanjpg} alt=""/>
                    <div className="card_1_des">Wearable Style Integration</div>
                    <div className="try"><Link to="/pageTwo">Try Now</Link></div>
                </div>

            </div>
        </div>
    </div>

    <div className="footer" id='contact'>
        <div className="footer_left">
            <form name="submit-to-google-sheet" onSubmit={(e)=>submitHandler(e)}>
                <input type="text" name="Name" placeholder="Your Name" required  onChange={(e)=>{setName(e.target.name)}}/>
                <input type="email" name="Email" placeholder="Your Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <textarea name="Message" rows="6" placeholder="Your Message" value={msg} onChange={(e)=>setMsg(e.target.value)}></textarea>
                <button type="submit" className="btn btn2" >Submit</button>
            </form>
        </div>
        <div className="footer_right" id='about'>
            <div className="footer_heading">Style Sync</div>
            <div className="footer_text">
                Style Sync redefines the fashion experience, seamlessly replacing virtual garments with your current
                attire. <br/>You can also get your attire by your imagination. You can give it the prompt and it generate
                the garment and fit to you body.
            </div>  
            <div className="footer_bottom">Made By <br/>Team Terminators <br/>#HackSRM</div>
        </div>
    </div>

  

    </>
  )
}

export default LandingPage