import React from "react"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h2 className="footer-logo">TastyGo</h2>
          <p>© 2025 TastyGo Limited</p>
        </div>

        {/* Right Section with Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Swiggy Corporate</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Swiggy One</a></li>
              <li><a href="#">Swiggy Instamart</a></li>
              <li><a href="#">Swiggy Dineout</a></li>
              <li><a href="#">Swiggy Genie</a></li>
              <li><a href="#">Minis</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="#">Help & Support</a></li>
              <li><a href="#">Partner With Us</a></li>
              <li><a href="#">Ride With Us</a></li>
            </ul>

            <h3>Legal</h3>
            <ul>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Available in:</h3>
            <ul>
              <li><a href="#">Bangalore</a></li>
              <li><a href="#">Gurgaon</a></li>
              <li><a href="#">Hyderabad</a></li>
              <li><a href="#">Delhi</a></li>
              <li><a href="#">Mumbai</a></li>
              <li><a href="#">Pune</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Life at Swiggy</h3>
            <ul>
              <li><a href="#">Explore With Swiggy</a></li>
              <li><a href="#">Swiggy News</a></li>
              <li><a href="#">Snackables</a></li>
            </ul>

            <h3>Social Links</h3>
            <div className="social-icons">
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaPinterest /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="footer-download">
        <p>For better experience, download the Swiggy app now</p>
        <div className="app-links">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Download_on_the_App_Store_Badge.svg" alt="App Store" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
