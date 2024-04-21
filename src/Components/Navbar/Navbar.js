import React from "react";
import "./Navbar.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

import { useState } from "react";

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [currentUser, setUser] = useState({
    id: 1,
    username: "Dhruvil",
    isSeller: true,
    img: "https://loremflickr.com/320/240",
  });

  return (
    <nav className="navigation">
      <a href="/" className="brand-name" style={{fontSize : "35px" , color : "slategray" , fontWeight : "bold"}}>
        Hackathon
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <FaFacebookSquare />
        {/* hamburger svg code... */}
      </button>

      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>

          <li>
            <a href="/home">Home</a>
          </li>
          
          { (
            <li>
              <a href="/about">About</a>
            </li>
          )}

        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;

// Instructions :
// install npm install react-icons --save

// const currentUser = {
//   id: 1,
//   username: "Dhruvil",
//   isSeller: true,
//   img: "https://loremflickr.com/320/240",
// };

// // const currentUser = false;
