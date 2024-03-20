import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/style.css"
import img1 from "../assests/black_girl.jpg"
import koreanjpg from "../assests/korean.jpg"
import man3 from "../assests/man_3-removebg-preview.png"

const LandingPage = () => {
  
    const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", checkBoxes);

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}

// var tablinks = document.getElementsByClassName("tab-links");
// var tabcontents = document.getElementsByClassName("tab-contents");

// function opentab(event,tabname) {
//     tablinks.forEach((tablink) => {
//         tablink.classList.remove("active-link");
//       });
//       tabcontents.forEach((tabcontent) => {
//         tabcontent.classList.remove("active-tab");
//       });
//   event.currentTarget.classList.add("active-link");
//   document.getElementById(tabname).classList.add("active-tab");
// }

// var sidemenu = document.getElementById("sidemenu");

// function openmenu() {
//   sidemenu.style.right = "0";
// }

// function closemenu() {
//   sidemenu.style.right = "-200px";
// }

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
            <div className="home"><a href="#">Home</a></div>
            <div className="home"><a href="#">About</a></div>
            <div className="home"><a href="#">Contact</a></div>
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

    <div className="main_page_2">
        <div className="box-1">
            <div className="box">
                <div className="card_1">
                    <img src={img1} alt="" />
                    <div className="card_1_des">Virtual Wardrobe Fusion</div>
                    <div className="try"><Link to="/pageOne">Try Now</Link></div>
                </div>

            </div>

            <div class="box">
                
                <div className="card_2" >
                    <img src={koreanjpg} alt=""/>
                    <div className="card_1_des">Wearable Style Integration</div>
                    <div className="try"><Link to="/pageTwo">Try Now</Link></div>
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default LandingPage