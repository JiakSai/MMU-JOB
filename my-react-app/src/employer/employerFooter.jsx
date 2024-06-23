import { FaFacebookSquare } from 'react-icons/fa';
import { FiInstagram } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";


function EmployerFooter(){
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
              <p className='employerLogo'>" MMUJOB "</p>
            </div>
            <div className="footer-col">
            <h4>Job seekers</h4>
              <ul className="links">
                <li><a href="/userRegister">Register for free</a></li>
                <li><a href="/SearchJob">Job search</a></li>
                <li><a href="/searchCompany">Company search</a></li>
                <li><a href="/UserProfile">User rofile</a></li>
              </ul>
            </div>
      
            <div className="footer-col">
            <h4>Employer</h4>
              <ul className="links">
                <li><a href="/employerRegister">Register for free</a></li>
                <li><a href="/listenJob">Listen job</a></li>
                <li><a href="/addPost">Post a job</a></li>
                <li><a href="/editComProfile">Company profile </a></li>
              </ul>
            </div>
      
            <div className="footer-col">
            <h4>About MMUJOB</h4>
              <ul className="links">
                <li><a href="/aboutUs">About us</a></li>
                <li><a href="/contactUs">Contact us</a></li>
                <li onClick={viewSocial}>
                  <div className='flex snap-center'><p>Social &#160;</p><FaAngleDown /></div>
                  <ul className="social">
                      <li><a href="#" className="social-link"><FaFacebookSquare />&nbsp;Facebook</a></li>
                      <li><a href="#" className="social-link"><FiInstagram />&nbsp;Instagram</a></li>
                      <li><a href="#" className="social-link"><FaXTwitter />&nbsp;Twitter</a></li>
                      <li><a href="#" className="social-link"><FaYoutube />&nbsp;Youtube</a></li>
                  </ul>
              </li> 
              </ul>
            </div>
      
            <div className="footer-col">
            <h4>Terms of Use</h4>
              <ul className="links">
                <li><a href="/communityGuidelines">Community Guidelines</a></li>
                <li><a href="/policy">Privacy Policy</a></li>
                <li><a href="/termsAndConditions">Terms and Conditions</a></li>         
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

export default EmployerFooter;
