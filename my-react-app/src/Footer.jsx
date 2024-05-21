import { FaFacebookSquare } from 'react-icons/fa';
import { FiInstagram } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";


function Footer(){
    var display = 0; 
    const viewSocial = () => {
              const social = document.querySelector('.social')
      
              if (display == 0) {
                  social.style.display = 'block';
                  display = 1;
              } else if (display == 1) {
                  social.style.display = 'none';
                  display = 0;
          }
    };
    

    return(
        <footer >
          <div className="newsletter">
              <div>
                <p>Subscribe to our newsletter</p>
                <p className="newsletterP">stay up to date with our news and articles</p>
              </div>
              <form action="#">
                <input type="text" placeholder="Your Email" required/>
                <button type="submit">SUBSCRIBE</button>
              </form>
          </div>
            
          <div className="footer-row">
            <div className="footer-col">
              " MMUJOB "
            </div>
            <div className="footer-col">
              <h4>Job seekers</h4>
              <ul className="links">
                <li><a href="#">Job search</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Recommended jobs</a></li>
                <li><a href="#">Saved jobs</a></li>
                <li><a href="#">Job applications</a></li>
              </ul>
            </div>
      
            <div className="footer-col">
              <h4>Employer</h4>
              <ul className="links">
                <li><a href="#">Register for free</a></li>
                <li><a href="#">Profile </a></li>
                <li><a href="#">Employer center</a></li>
                <li><a href="#">Post a job</a></li>
              </ul>
            </div>
      
            <div className="footer-col">
              <h4>About MMUJOB</h4>
              <ul className="links">
                <li><a href="#">About us</a></li>
                <li><a href="#">Work for Jobstreet</a></li>
                <li><a href="#">International partners</a></li>
                <li><a href="#">Partner services</a></li>
              </ul>
            </div>
      
            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="links">
                <li><a href="#">Help centre</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Product & tech blog</a></li>
                <li onClick={viewSocial}>
                    <p>Social &#160;<FaAngleDown /></p>
                  <ul className="social">
                      <li><a href="#" className="social-link"><FaFacebookSquare />&nbsp;Facebook</a></li>
                      <li><a href="#" className="social-link"><FiInstagram />&nbsp;Instagram</a></li>
                      <li><a href="#" className="social-link"><FaXTwitter />&nbsp;Twitter</a></li>
                      <li><a href="#" className="social-link"><FaYoutube />&nbsp;Youtube</a></li>
                  </ul>
              </li>              
              </ul>
            </div>
          </div>

          <div className="footer-lastrow">
            <div className="footer-lastcol">
              <a href="#"><FaFacebookSquare /></a>
              <a href="#"><FiInstagram/></a>
              <a href="#"><FaXTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>
            <div className="footer-lastcol2">
              <p><i className="fa-regular fa-copyright"></i>MMUJOB. 2024, all rights reserved</p>
            </div>
          </div>
        </footer>
    );
}

export default Footer;
