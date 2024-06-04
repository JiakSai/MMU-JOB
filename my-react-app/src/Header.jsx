import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {
    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    };

    const showSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    };

    const navigate = useNavigate();
    const token = Cookies.get('token');

    const handleProfileClick = () => {
        if (!token) {
            navigate('/userLogin');
        }
    };

    const handleUserClick = () => {
        if (!token) {
            navigate('/userLogin');
        }
    };
    const handleLogout = () => {
        axios.get('/UserLogout')
            .then(response => {
                console.log(response.data);
                Cookies.remove('token');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <header>
            <nav>
                <ul className="sidebar">
                    <li onClick={hideSidebar}><FontAwesomeIcon icon={faTimes} className="closeIcon" /></li>
                    <li className="logo"><a href="#">" MMUJOB "</a></li>
                    <li><a href="#">Job search</a></li>
                    <li>
                        <Link to={token ? "/UserProfile" : "#"} onClick={handleProfileClick}>
                            Profile
                        </Link>
                    </li>
                    <li><a href="#">Company profiles</a></li>
                    <li id="user" className="User">
                        <a href="#" onClick={handleUserClick}>User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                        {token && (
                            <ul className="Dropdown">
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Saved search</a></li>
                                <li><a href="#">Saved Job</a></li>
                                <li><a href="#">Job application</a></li>
                                <li><a href="#">Recommended Job</a></li>
                                <li><a href="#">Setting</a></li>
                                <li style={{ color: 'red' }}><a href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#">Employer site</a></li>
                </ul>
                <ul>
                    <li className="logo"><a href="#">" MMUJOB "</a></li>
                    <li className="hideOnMobile"><Link to={"/SearchJob"}>job search</Link></li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/UserProfile" : "#"} onClick={handleProfileClick}>
                            Profile
                        </Link>
                    </li>
                    <li className="hideOnMobile"><a href="#">Company profiles</a></li>
                    <li className="hideOnMobile">
                        <ul>
                            <li id="user" className="User">
                                <a href="#" onClick={handleUserClick}>User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                                {token && (
                                    <ul className="Dropdown">
                                        <li><a href="#">Profile</a></li>
                                        <li><a href="#">Saved search</a></li>
                                        <li><a href="#">Saved Job</a></li>
                                        <li><a href="#">Job application</a></li>
                                        <li><a href="#">Recommended Job</a></li>
                                        <li><a href="#">Setting</a></li>
                                        <li style={{ color: 'red' }}><a href="#" onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                )}
                            </li>
                            <li className='site'><a href="#">Employer site</a></li>
                        </ul>
                    </li>
                    <li className="menu-button" onClick={showSidebar}><FontAwesomeIcon icon={faBars} className="menuIcon" /></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
