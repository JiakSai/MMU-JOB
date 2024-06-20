import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function EmployerHeader() {
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
        const token = Cookies.get('token'); // get the token from cookies
    
        axios.get('http://localhost:8000/api/EmployerLogout', {
            headers: {
                'Authorization': `Bearer ${token}` // include the token in the Authorization header
            }
        })
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
                    <li className="empLogo"><a href="#">" MMUJOB "</a></li>
                    <li>
                        <Link to={token ? "/listenJob" : "/employerLogin"} onClick={handleProfileClick}>
                            Listen Job
                        </Link>
                    </li>
                    <li>
                        <Link to={token ? "/addPost" : "/employerLogin"} onClick={handleProfileClick}>
                            Add Job
                        </Link>
                    </li>
                    <li>
                        <Link to={token ? "/editComProfile" : "/employerLogin"} onClick={handleProfileClick}>
                            Company profile
                        </Link>
                    </li>
                    <li id="user" className="User">
                        <a href="#" onClick={handleUserClick}>User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                        {token && (
                            <ul className="Dropdown">
                                <li>
                                    <Link to={token ? "/editComProfile" : "/employerLogin"} onClick={handleProfileClick}>
                                        Company profile
                                    </Link>
                                </li>
                                <li><a href="#">Job application</a></li>
                                <li style={{ color: 'red' }}><Link to={"/employerLogin"} onClick={handleLogout}>Logout</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#">Employer site</a></li>
                </ul>
                <ul>
                    <li className="empLogo"><a href="#">" MMUJOB "</a></li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/listenJob" : "/employerLogin"} onClick={handleProfileClick}>
                            Listen Job
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/addPost" : "/employerLogin"} onClick={handleProfileClick}>
                            Add JOb
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <Link to={token ? "/editComProfile" : "/employerLogin"} onClick={handleProfileClick}>
                            Company profile
                        </Link>
                    </li>
                    <li className="hideOnMobile">
                        <ul>
                            <li id="user" className="User">
                                <a href="#" onClick={handleUserClick}>User &#160;<i style={{ fontSize: '20px' }} className="fa fa-angle-down" aria-hidden="true"></i></a>
                                {token && (
                                    <ul className="Dropdown">
                                        <li>
                                            <Link to={token ? "/editComProfile" : "/employerLogin"} onClick={handleProfileClick}>
                                            Company profile
                                            </Link>
                                        </li>
                                        <li><a href="#">Job application</a></li>
                                        <li style={{ color: 'red' }}><Link to={"/employerLogin"} onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li className='site'><a href="#">Jobseeker site</a></li>
                        </ul>
                    </li>
                    <li className="menu-button" onClick={showSidebar}><FontAwesomeIcon icon={faBars} className="menuIcon" /></li>
                </ul>
            </nav>
        </header>
    );
}

export default EmployerHeader;
